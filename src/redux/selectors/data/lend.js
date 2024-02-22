// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "constants/address_map.json";
import { networkSelector } from "redux/selectors/drizzle";
import web3 from "web3";

// Helpers
function calculateInterest(rateMantissa) {
    const total_blocks_per_year = (3600 * 24 * 365) / 15;
    let rateAPR = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPR;
}

function calculateUtilization(totalBorrow, totalSupply) {
    const utilization = totalBorrow / totalSupply;

    return utilization;
}

const getAllowances = (state) => {
    const allowances = {};
    Object.keys(state.contracts).forEach((asset) => {
        if (asset !== "MoneyMarket") {
            const allowance = Object.values(state.contracts[asset].allowance);
            allowances[asset] = _.get(allowance, "[0].value", "0") !== "0";
        }
    });
    return allowances;
};

// Lend Selectors
const getSupplyAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        // console.log("Supply Account Value", calculateAccountValues[0].value[1]);
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

const lendAssetSelector = (state) => state.data.lend.assets;

const lendBalanceSelector = (state) => {
    const supplyBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getSupplyBalance", {})
    ).forEach((balance) => (supplyBalance[balance.args[1]] = balance.value));
    return supplyBalance;
};

const lendAPRSelector = (state) => {
    const supplyAPR = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (apr) =>
            (supplyAPR[apr.args[0]] = calculateInterest(
                apr.value.supplyRateMantissa
            ))
    );
    return supplyAPR;
};

const lendPrincipalSelector = (state) => {
    const supplyPrincipal = {};

    Object.values(
        _.get(state, "contracts.MoneyMarket.supplyBalances", {})
    ).forEach(
        (deposit) =>
            (supplyPrincipal[deposit.args[1]] = deposit.value.principal)
    );
    return supplyPrincipal;
};

const getUtilizationValues = (state) => {
    const utilizationRates = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (market) =>
            (utilizationRates[market.args[0]] = calculateUtilization(
                market.value[6],
                market.value[3]
            ))
    );
    return utilizationRates;
};

const getAssetPrices = (state) => {
    const assetPrices = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.assetPrices", {})
    ).forEach((asset) => (assetPrices[asset.args[0]] = asset.value));
    return assetPrices;
};

const getLendAsset = createSelector(
    lendAssetSelector,
    networkSelector,
    lendBalanceSelector,
    lendAPRSelector,
    lendPrincipalSelector,
    getUtilizationValues,
    getAssetPrices,
    getSupplyAccountValue, // TODO: refactor this to getLendAccountValue for consistency
    (
        assets,
        network,
        lendBalances,
        lendAPR,
        lendPrincipal,
        marketUtilization,
        assetPrices,
        accountTotalSupply
    ) =>
        Object.values(assets).map((asset) => {
            // supply wallet
            let balance = "0";
            let apr = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";
            let totalSupplied = "0";
            let ethBalance = "0";
            let weight = "0";

            let USDprice = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = lendBalances[token_address] || "0";
                apr = lendAPR[token_address] || "0";
                principal = lendPrincipal[token_address] || "0";
                utilization = marketUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                totalSupplied = accountTotalSupply || "0";
                ethBalance = web3.utils
                    .toBN(balance)
                    .mul(web3.utils.toBN(price))
                    .toString();
                weight = (
                    ethBalance / web3.utils.fromWei(totalSupplied)
                ).toString();

                USDprice =
                    assetPrices["0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E"] ||
                    "0";
            }
            return {
                ...asset,
                balance,
                ethBalance,
                weight,
                apr,
                principal,
                utilization,
                price,
                USDprice,
            };
        })
);

// LEND Create Selectors
export const getLendActive = createSelector(getLendAsset, (assets) => {
    return assets.filter((asset) => asset.balance !== "0");
});

export const getAggregatedLendAPR = createSelector(
    getLendActive,
    networkSelector,
    (activeAssets, network) => {
        let totalAPR = 0;
        if (network) {
            // checks that web3 wallet is connected
            activeAssets.forEach(function (asset) {
                totalAPR += asset.weight * asset.apr;
                totalAPR = parseInt(totalAPR);
            });
        }

        if (isFinite(totalAPR)) {
            totalAPR = web3.utils.fromWei(totalAPR.toString()); // formats for WEI to decimal
        }

        return totalAPR.toString();
    }
);

export const getLendInactive = createSelector(
    getLendAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter((asset) => asset.balance === "0")
            .map((asset) => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getLendPending = (state) =>
    Object.values(state.data.lend.assets).filter((asset) => asset.pending);

export const getLendError = (state) => state.data.lend.error;
