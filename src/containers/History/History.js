// Imports Section 1: React/Reduxd low level imports
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { useSelector } from "react-redux";

// Imports Section 2: Internal Imports
import History from "components/History/History";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import useFetchTx from "hooks/useFetchTx";
import { getTxList, getTxPending, getTxError } from "redux/selectors/data/tx";

import { walletAddress } from "redux/selectors/onboard";

// Section 4: Container Code

const HistoryContainer = ({ drizzle, address, txList, txPending, txError }) => {
    useFetchTx(); // gets txList from Etherscan

    const currentAddress = useSelector(walletAddress);

    return (
        <div className="history-list-wrapper">
            <History
                txList={txList}
                txPending={txPending}
                txError={txError}
                address={currentAddress}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    txPending: getTxPending(state),
    txList: getTxList(state),
    txError: getTxError(state),
});

export default compose(
    withDrizzle(),
    connect(mapStateToProps)
)(HistoryContainer);
