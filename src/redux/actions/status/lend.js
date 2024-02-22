// Section 1: Utilities imports and low level imports

import { handle_approve_click } from "utils/drizzle";
import notify from "utils/notify";

// Section 2: Action types declarations and action creators

//                                      //
// ------------ LEND ACTIONS --------   //
//                                      //

// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = (asset, error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_ERROR,
    payload: {
        asset,
    },
    error,
});

// Section 3: Action dispatch methods and async funcs

export const onLendActivate = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchLendPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve_click({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchLendSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "fetchLendError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(fetchLendError(asset, error.message));
        });
};
