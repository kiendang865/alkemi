import React from "react";
import { useSelector } from "react-redux";

import CardLimit from "components/Borrow/CardLimit";
import {
    getTotalBorrow,
    getTotalDeposit,
    getCollateralRatio,
} from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardLimitContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalBorrowed = useSelector(getTotalBorrow);
    const totalDeposited = useSelector(getTotalDeposit);
    const collateralRatio = useSelector(getCollateralRatio) / 1e18;

    const maxBorrow = totalDeposited / collateralRatio;

    let borrowLimit = ((totalBorrowed / maxBorrow) * 100).toFixed(2);
    if (isFinite(borrowLimit)) {
        // make sure is finite number
        borrowLimit = parseFloat(borrowLimit);
    } else {
        // otherwise set to 0
        borrowLimit = 0;
    }

    return <CardLimit borrowLimit={borrowLimit} />;
};

export default CardLimitContainer;
