import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import BorrowModal from "components/Borrow/ModalBorrow";
import onBorrowAction from "./BorrowAction";

const BorrowModalContainer = ({ asset, drizzle, onBorrowAction }) => {
    return (
        <BorrowModal
            asset={asset}
            onBorrow={({ asset, amount }) =>
                onBorrowAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onBorrowAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowModalContainer);
