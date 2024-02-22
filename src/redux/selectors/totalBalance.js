import { createSelector } from "reselect";
import _ from "lodash";
import web3 from "web3";

const getDepositAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        // console.log("Supply Account Value", calculateAccountValues[0].value[1]);
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio"
    );
    if (collateralRatio && collateralRatio["0x0"]) {
        //console.log("collateralRatio", collateralRatio["0x0"].value);
        return _.get(collateralRatio, "['0x0'].value");
    }
    return null;
};

const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

export const getMaxBorrowAmount = createSelector(
    getDepositAccountValue,
    getCollateralRatio,
    getBorrowAccountValue,
    (suppliedValue, collateralValue, borrowedValue) =>
        suppliedValue && collateralValue && borrowedValue
            ? web3.util
                  .toBN(suppliedValue)
                  .div(web3.utils.toBN(collateralValue))
                  .sub(web3.utils.toBN(borrowedValue))
                  .toString()
            : null
);

export const getSafeBorrowAmount = createSelector(
    getMaxBorrowAmount,
    (maxBorrowValue) => (maxBorrowValue ? maxBorrowValue * "0.8" : "0")
);

export const getUserCollateralRatio = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    let collateralRatio = 0;
    if (calculateAccountValues[0]) {
        let totalSupplied = _.get(calculateAccountValues, "[0].value[1]");
        let totalBorrowed = _.get(calculateAccountValues, "[0].value[2]");
        let collateralRatio = totalSupplied / totalBorrowed || "0";
        return collateralRatio;
    }
    return collateralRatio;
};

export const getUSDPrice = (state) => {
    if (state.data.price.usdPrice && state.data.price.usdPrice !== "0")
        return state.data.price.usdPrice;
    else return null;
};

export const getTotalDeposit = createSelector(
    getDepositAccountValue,
    getUSDPrice,
    (depositValue, USDxPrice) =>
        depositValue && USDxPrice
            ? web3.utils
                  .toBN(depositValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getTotalBorrow = createSelector(
    getBorrowAccountValue,
    getUSDPrice,
    (borrowValue, USDxPrice) =>
        borrowValue && USDxPrice
            ? web3.utils
                  .toBN(borrowValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getAggregatedBalance = createSelector(
    getDepositAccountValue,
    getBorrowAccountValue,
    getUSDPrice,
    (depositValue, borrowValue, USDxPrice) =>
        depositValue && borrowValue && USDxPrice
            ? web3.utils
                  .toBN(depositValue)
                  .sub(web3.utils.toBN(borrowValue))
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);
