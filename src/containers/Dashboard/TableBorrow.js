// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports
import withDrizzle from "containers/Drizzle/withDrizzle";
import TableBorrow from "components/Dashboard/TableBorrow";

import useFetchPrice from "hooks/useFetchPrice";

// Section 3: Selectors
import { getBorrowActive } from "redux/selectors/data/borrow";

import { getUSDPrice } from "redux/selectors/totalBalance";

const TableBorrowContainer = ({ activeReserves }) => {
    useFetchPrice(); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    return (
        <TableBorrow
            activeReserves={activeReserves}
            /*currency="USD"*/ USDPrice={USDPrice}
        />
    );
};

const mapStateToProps = (state) => ({
    activeReserves: getBorrowActive(state),
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(TableBorrowContainer);
