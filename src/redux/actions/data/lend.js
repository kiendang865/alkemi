// Section 1: Utilities imports and low level imports

import {
    handle_allocate_click,
    handle_deposit_click,
    handle_withdraw_click,
} from "utils/drizzle";
import notify from "utils/notify";

// Section 2: Action types declarations and action creators

//                                            //
// ------------- DEPOSIT ACTIONS ------------- //
//                                            //

export const DEPOSIT_PENDING = "DEPOSIT_PENDING";
export const depositPending = (asset) => ({
    type: DEPOSIT_PENDING,
    payload: {
        asset,
    },
});

export const DEPOSIT_SUCCESS = "DEPOSIT_SUCCESS";
export const depositSuccess = (asset) => ({
    type: DEPOSIT_SUCCESS,
    payload: {
        asset,
    },
});

export const DEPOSIT_ERROR = "DEPOSIT_ERROR";
export const depositError = (asset, error) => ({
    type: DEPOSIT_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ---------------- WITHDRAW ACTIONS ------------  //
//                                               //

export const WITHDRAW_PENDING = "WITHDRAW_PENDING";
export const withdrawPending = (asset) => ({
    type: WITHDRAW_PENDING,
    payload: {
        asset,
    },
});

export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const withdrawSuccess = (asset) => ({
    type: WITHDRAW_SUCCESS,
    payload: {
        asset,
    },
});

export const WITHDRAW_ERROR = "WITHDRAW_ERROR";
export const withdrawError = (asset, error) => ({
    type: WITHDRAW_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ------------ APPROVE  ACTIONS -------------   //
//                                               //

export const APPROVE_PENDING = "APPROVE_PENDING";
export const approvePending = (asset) => ({
    type: APPROVE_PENDING,
    payload: {
        asset,
    },
});

export const APPROVE_SUCCESS = "APPROVE_SUCCESS";
export const approveSuccess = (asset) => ({
    type: APPROVE_SUCCESS,
    payload: {
        asset,
    },
});

export const APPROVE_ERROR = "APPROVE_ERROR";
export const approveError = (asset, error) => ({
    type: APPROVE_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ------------ ALLOCATE ACTIONS -------------   //
//                                               //

export const ALLOCATE_PENDING = "ALLOCATE_PENDING";
export const allocatePending = (asset) => ({
    type: ALLOCATE_PENDING,
    payload: {
        asset,
    },
});

export const ALLOCATE_SUCCESS = "ALLOCATE_SUCCESS";
export const allocateSuccess = (asset) => ({
    type: ALLOCATE_SUCCESS,
    payload: {
        asset,
    },
});

export const ALLOCATE_ERROR = "ALLOCATE_ERROR";

export const allocateError = (asset, error) => ({
    type: ALLOCATE_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ------------- RESET LEND DATA -------------   //
//                                               //

export const RESET_LEND_DATA = "RESET_LEND_DATA";

export const resetLendData = () => ({
    type: RESET_LEND_DATA,
});

// Section 3: Action dispatch methods and async funcs

export const onAllocateAction = ({ drizzle, asset, amount }) => async (
    dispatch
) => {
    dispatch(allocatePending(asset));
    handle_allocate_click({ drizzle, asset, amount })
        .then(() => dispatch(allocateSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "allocateError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(allocateError(asset, error.message));
        });
};

export const onDepositAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(depositPending(asset.unit));
    handle_deposit_click({ drizzle, amount, asset })
        .then(() => dispatch(depositSuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "depositError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(depositError(asset.unit, error.message));
        });
};

export const onWithdrawAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(withdrawPending(asset.unit));
    handle_withdraw_click({ drizzle, amount, asset })
        .then(() => dispatch(withdrawSuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "withdrawError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(withdrawError(asset.unit, error.message));
        });
};
