// Main Container

// Section 1: React/Reduxd low level imports
import React from "react";
import { connect,  useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import { onBorrowActivate } from "redux/actions/status/borrow";
import Borrow from "components/Borrow/Borrow";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    getBorrowActive,
    getBorrowInactive,
    getAggregatedBorrowAPR,
    //  getBorrowError,
    //  getBorrowPending
} from "redux/selectors/data/borrow";
import useFetchPrice from "hooks/useFetchPrice";
import { getTotalBorrow } from "redux/selectors/totalBalance";

const BorrowContainer = ({
    inactiveBorrow,
    activeBorrow,
    onActivate,
    drizzle,
}) => {
    useFetchPrice(); // gets current USD price
    const totalBorrow = useSelector(getTotalBorrow);
    const totalBorrowAPR = useSelector(getAggregatedBorrowAPR);
    return (
        <Borrow
            inactiveBorrow={inactiveBorrow}
            activeBorrow={activeBorrow}
            onActivate={(asset) => onActivate({ drizzle, asset })}
            totalBorrow={totalBorrow} currency="USD" difference={0}
            totalAPR={totalBorrowAPR}
        />
    );
};

const mapStateToProps = (state) => ({
    inactiveBorrow: getBorrowInactive(state),
    activeBorrow: getBorrowActive(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onActivate: onBorrowActivate }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowContainer);
