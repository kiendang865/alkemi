// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports

// import {
//     getMarketContract,
//     createActiveAssetContract
// } from "utils/drizzle";

import withDrizzle from "containers/Drizzle/withDrizzle";
import TableSupply from "components/Dashboard/TableDeposit";

import useFetchPrice from "hooks/useFetchPrice";

// Section 3: Selectors
import { getLendActive } from "redux/selectors/data/lend";

import { getUSDPrice } from "redux/selectors/totalBalance";

const TableDepositContainer = ({ activeReserves }) => {
    useFetchPrice(); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store
    return (
        <TableSupply
            activeReserves={activeReserves}
            /*currency="USD"*/ USDPrice={USDPrice}
        />
    );
};

const mapStateToProps = (state) => ({
    activeReserves: getLendActive(state),
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableDepositContainer);
