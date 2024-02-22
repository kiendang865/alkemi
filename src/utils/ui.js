import web3 from "web3";
// import internal assets
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
import WBTC from "assets/images/WBTC.svg";
import USDT from "assets/images/USDT.svg";
import WETH from "assets/images/WETH.svg";
import PAX from "assets/images/pax.png";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether",
};

// decimals is constant, default will be 12
const assetToDecimals = {
    USDx: 18,
    WETH: 18,
    DAI: 18,
    PAX: 18,
    USDT: 6,
    USDC: 6,
    WBTC: 8,
};

const token2icon = {
    WETH: WETH,
    USDT: USDT,
    USDC: USDC,
    PAX: PAX,
    WBTC: WBTC,
    DAI: DAI,
};

export const getTokenIcon = (symbol) => {
    const icon = token2icon[symbol];
    return icon;
};

export const fromWei = (value, unit) => {
    if (isNaN(value)) {
        value = 0;
    }
    value = value.toString();

    if (unit === "WBTC") {
        let amount = web3.utils.fromWei(value, "lovelace");
        amount = amount / 100;
        return amount.toString();
    } else {
        return web3.utils.fromWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

export const toWei = (value, unit) => {
    if (unit === "WBTC") {
        let amount = web3.utils.toWei(value, "lovelace");
        amount = amount * 100;
        return amount.toString();
    } else {
        return web3.utils.toWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

export const formatNumber = (value, unit) => {
    if (!value) return 0;
    const wei = fromWei(value, unit);
    return new Intl.NumberFormat("en-es", { maximumFractionDigits: 2 }).format(
        wei
    );
};

// value in USDx
export const formatMoney = (value, currency) => {
    const wei = fromWei(value);
    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(wei);
};

// value in USD
export const formatETHMoney = (value, currency, unit, usdPrice) => {
    if (usdPrice === null || usdPrice === undefined) {
        usdPrice = "4131207138725935";
    }

    let calculation = web3.utils
        .toBN(value)
        .div(web3.utils.toBN(usdPrice))
        .toString();

    switch (unit) {
        case "WBTC":
            calculation = calculation / 1e10;
            break;
        case "USDC":
        case "USDT":
            calculation = calculation / 1e12;
            break;
        default:
        // code block
    }

    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(calculation);
};

// Format a price number with proper symbol (ex: $1.01)
export const formatPriceWithCurrency = (price, currency) => {
    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(price);
};

// value in Percent
export const formatPercent = (num) => {
    return (num * 100).toFixed(2) + "%";
};

export function calculateEarnings(balance, principal, unit, USDPrice) {
    if (!USDPrice) return 0;

    const fPrincipal = fromWei(principal, unit);
    const fBalance = fromWei(balance, unit);
    const fUSDprice = fromWei(USDPrice, "USDx");

    let earnings = fBalance - fPrincipal;
    earnings = earnings / fUSDprice;

    earnings = formatPriceWithCurrency(earnings, "USD");

    return earnings;
}

export const toDate = (timeStamp) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    let dateTime = new Date(timeStamp * 1000);
    dateTime = dateTime.toLocaleDateString("en-US", options); // Returns "2013-05-31T11:54:44.000Z"
    return dateTime;
};

export const checkAction = (address, toAddress, fromAddress, amount) => {
    const myAddress = address.toUpperCase();
    let action;
    if (amount === "0") {
        action = "Mint";
        return action;
    }

    // if from Address is Users Address
    if (fromAddress.toUpperCase() === myAddress) {
        action = "Deposit";
        return action;
    }

    if (toAddress.toUpperCase() === myAddress) {
        action = "Borrow";
        return action;
    }

    return action;
};

export const checkAddress = (address, toAddress, fromAddress) => {
    // get MoneyMarket Address from constants
    const mMarket = "0xe6a53f96ceca750ef8589c5b376872213aa4f230";

    // if from Address is Users Address
    if (fromAddress === address) {
        //  action = "Sent";
        return toAddress;
    }

    if (fromAddress === mMarket) {
        //  action = "Received";
        return fromAddress;
    }
};

export const openEtherScan = (hash) => {
    //TODO: grab network id from state https://[network].etherscan.io/tx/"
    const urlBase = "https://rinkeby.etherscan.io/tx/";
    const url = urlBase + hash;

    return url;
};
