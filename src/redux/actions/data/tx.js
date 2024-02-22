// Section 1: Utilities imports and low level imports
import _ from "lodash";
const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                     //
// ------------ TX ACTIONS --------    //
//                                     //

// Declare action type as a constant
export const FETCH_TX_PENDING = "FETCH_TX_PENDING";

// Declare action creator
const fetchTxPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_PENDING,
});

// Declare action type as a constant
export const FETCH_TX_SUCCESS = "FETCH_TX_SUCCESS";

// Declare action creator
const fetchTxSuccess = (txList) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_SUCCESS,
    payload: {
        txList,
    },
});

// Declare action type as a constant
export const FETCH_TX_ERROR = "FETCH_TX_ERROR";

// Declare action creator
const fetchTxError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_ERROR,
    payload: new Error(),
    error: true,
});

//                                            //
// ------------ TX METHOD ACTIONS --------   //
//                                          //

const fetchTxCall = ({ currentNetworkName, address, dispatch }) => {
    if (!address) return;
    if (!url_map[currentNetworkName].etherscan_url) return;

    dispatch(fetchTxPending());

    fetch(url_map[currentNetworkName].etherscan_url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);
                const myAddress = address.toUpperCase();

                let txList = [];
                let userTxList = [];
                txList = obj_data.result;
                let toAddress = "";
                let fromAddress = "";

                for (let i = 0; i < txList.length; i++) {
                    toAddress = txList[i].to.toUpperCase();
                    fromAddress = txList[i].from.toUpperCase();

                    if (myAddress === toAddress) {
                        userTxList.push(txList[i]);
                    }
                    if (myAddress === fromAddress) {
                        userTxList.push(txList[i]);
                    }
                }

                dispatch(fetchTxSuccess(userTxList));
            }
        })
        .catch((error) => {
            dispatch(fetchTxError(error.message));
        });
};

// This call may be fetched from multiple containers but only executes once every 60 seconds
const throttledFetchTx = _.throttle(fetchTxCall, 60 * 1000, {
    trailing: false,
});

// Section 3: Action dispatch methods and async funcs
export const fetchTx = ({ currentNetworkName, address }) => async (
    dispatch
) => {
    throttledFetchTx({ currentNetworkName, address, dispatch });
};
