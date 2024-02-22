// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports
import withDrizzle from "containers/Drizzle/withDrizzle";
import CardBorrow from "components/Dashboard/CardBorrow";

// Section 3: Selectors / hooks
import { getTotalBorrow } from "redux/selectors/totalBalance";
import { getAggregatedBorrowAPR } from "redux/selectors/data/borrow";
import useFetchPrice from "hooks/useFetchPrice";

// Section 4: Code Component
const CardValueContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalBorrow = useSelector(getTotalBorrow);

    const totalBorrowAPR = useSelector(getAggregatedBorrowAPR); // combined portfolio APR rate

    return (
        <CardBorrow
            totalBorrow={totalBorrow}
            currency="USD"
            difference={0}
            apr={totalBorrowAPR}
        />
    );
};

// const mapStateToProps = (state) => ({
//     activeReserves: getBorrowActive(state),
// });

export default compose(
    withDrizzle()
    //  connect(mapStateToProps)
)(CardValueContainer);
