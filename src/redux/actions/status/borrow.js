// Section 1: Utilities imports and low level imports

import { handle_approve_click } from "utils/drizzle";
import notify from "utils/notify";

// Section 2: Action types declarations and action creators

//                                      //
// -------- FETCH BORROW ACTIONS ------ //
//                                      //

// Declare action type as a constant
export const FETCH_BORROW_PENDING = "FETCH_BORROW_PENDING";

// Declare action creator
const fetchBorrowPending = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_BORROW_SUCCESS = "FETCH_BORROW_SUCCESS";

// Declare action creator
const fetchBorrowSuccess = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_BORROW_ERROR = "FETCH_BORROW_ERROR";

// Declare action creator
const fetchBorrowError = (asset, error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_ERROR,
    payload: {
        asset,
    },
    error,
});

// Section 3: Action dispatch methods and async funcs

export const onBorrowActivate = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchBorrowPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve_click({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchBorrowSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "fetchBorrowError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(fetchBorrowError(asset, error.message));
        });
};
