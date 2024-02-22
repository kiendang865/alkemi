// Section 1: Utilities imports and low level imports

import { handle_borrow_click, handle_repay_click } from "utils/drizzle";
import notify from "utils/notify";

// Section 2: Action types declarations and action creators

//                                               //
// -------------- BORROW ACTIONS --------------  //
//                                               //

// Declare action type as a constant
export const BORROW_PENDING = "BORROW_PENDING";

const borrowPending = (asset) => ({
    type: BORROW_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const BORROW_SUCCESS = "BORROW_SUCCESS";

const borrowSuccess = (asset) => ({
    type: BORROW_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const BORROW_ERROR = "BORROW_ERROR";

const borrowError = (asset, error) => ({
    type: BORROW_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// --------------- REPAY ACTIONS --------------  //
//                                               //

// Declare action type as a constant
export const REPAY_PENDING = "REPAY_PENDING";

const repayPending = (asset) => ({
    type: REPAY_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const REPAY_SUCCESS = "REPAY_SUCCESS";

const repaySuccess = (asset) => ({
    type: REPAY_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const REPAY_ERROR = "REPAY_ERROR";

const repayError = (asset, error) => ({
    type: REPAY_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ------------- RESET BORROW DATA ------------- //
//                                               //

export const RESET_BORROW_DATA = "RESET_BORROW_DATA";

export const resetBorrowData = () => ({
    type: RESET_BORROW_DATA,
});

// Section 3: Action dispatch methods and async funcs

export const onBorrowAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(borrowPending(asset.unit));
    handle_borrow_click({ drizzle, amount, asset })
        .then(() => dispatch(borrowSuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "borrowError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(borrowError(asset.unit, error.message));
        });
};

export const onRepayAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(repayPending(asset.unit));
    handle_repay_click({ drizzle, amount, asset })
        .then(() => dispatch(repaySuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "repayError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(repayError(asset.unit, error.message));
        });
};
