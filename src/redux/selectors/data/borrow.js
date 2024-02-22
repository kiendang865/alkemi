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

const getAccountLiquidity = (state) => {
    const accountLiquidity = Object.values(
        _.get(state, "contracts.MoneyMarket.getAccountLiquidity", {})
    );
    if (accountLiquidity[0]) {
        //console.log(" Account Liquidity", accountLiquidity[0].value);
        return _.get(accountLiquidity, "[0].value");
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio"
    );
    if (collateralRatio["0x0"]) {
        //console.log("collateralRatio", collateralRatio["0x0"].value);
        return _.get(collateralRatio, "['0x0'].value");
    }
    return null;
};

// Borrow Selectors
const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

const borrowAssetSelector = (state) => state.data.borrow.assets;

const borrowBalanceSelector = (state) => {
    const borrowBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getBorrowBalance", {})
    ).forEach((balance) => (borrowBalance[balance.args[1]] = balance.value));
    return borrowBalance;
};

const borrowAPRSelector = (state) => {
    const borrowAPR = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (apr) =>
            (borrowAPR[apr.args[0]] = calculateInterest(
                apr.value.borrowRateMantissa
            ))
    );
    return borrowAPR;
};

const borrowPrincipalSelector = (state) => {
    const borrowPrincipal = {};

    Object.values(
        _.get(state, "contracts.MoneyMarket.borrowBalances", {})
    ).forEach((loan) => (borrowPrincipal[loan.args[1]] = loan.value.principal));
    return borrowPrincipal;
};

// Create Borrow Selectors

const getBorrowAsset = createSelector(
    borrowAssetSelector,
    networkSelector,
    borrowBalanceSelector,
    borrowAPRSelector,
    borrowPrincipalSelector,
    getUtilizationValues,
    getAssetPrices,
    getAccountLiquidity,
    getBorrowAccountValue,
    (
        assets,
        network,
        borrowBalances,
        borrowAPR,
        borrowPrincipal,
        marketUtilization,
        assetPrices,
        accountLiquidity,
        accountTotalBorrow
    ) =>
        Object.values(assets).map((asset) => {
            let balance = "0";
            let ethBalance = "0";
            let weight = "0";
            let apr = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";
            let USDprice = "0";
            let maxBorrowToken = "0";
            let safeBorrowToken = "0";
            let totalBorrowed = "0";
            if (network && address[network]) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = borrowBalances[token_address] || "0";
                apr = borrowAPR[token_address] || "0";
                principal = borrowPrincipal[token_address] || "0";
                utilization = marketUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                totalBorrowed = accountTotalBorrow || "0";
                ethBalance = web3.utils
                    .toBN(balance)
                    .mul(web3.utils.toBN(price))
                    .toString();
                weight = (
                    ethBalance / web3.utils.fromWei(totalBorrowed)
                ).toString();

                USDprice =
                    assetPrices["0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E"] ||
                    "0";
            }

            if (network && accountLiquidity && price && price > 0) {
                let mantissaPrice;
                switch (asset.unit) {
                    case "USDT":
                        mantissaPrice = price / 1e12;
                        break;
                    case "USDC":
                        mantissaPrice = price / 1e12;
                        break;
                    case "WBTC":
                        mantissaPrice = price / 1e10;
                        break;
                    default:
                        mantissaPrice = price;
                }

                maxBorrowToken = web3.utils
                    .toBN(accountLiquidity) // Amount of User Liquidity in ETH scaled by 10e18
                    .div(web3.utils.toBN(parseInt(mantissaPrice))); // Liquidity ETH Amount divided Amount of tokens for 1 Eth

                maxBorrowToken = maxBorrowToken * 0.7999; // Maximum Borrow Amount with collateralRatio + Originatio Fee factored

                safeBorrowToken = maxBorrowToken * 0.8; // 80% of Maximum Borrow Amount
            }

            return {
                ...asset,
                balance,
                ethBalance,
                apr,
                weight,
                principal,
                utilization,
                price,
                USDprice,
                maxBorrowToken,
                safeBorrowToken,
            };
        })
);

export const getBorrowActive = createSelector(getBorrowAsset, (assets) =>
    assets.filter((asset) => asset.balance !== "0")
);

export const getBorrowInactive = createSelector(
    getBorrowAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter((asset) => asset.balance === "0")
            .map((asset) => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getBorrowError = (state) => state.data.borrow.error;

export const getAggregatedBorrowAPR = createSelector(
    getBorrowActive,
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
