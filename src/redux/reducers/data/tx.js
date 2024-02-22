// Import action of interest as constants
import {
    FETCH_TX_PENDING,
    FETCH_TX_SUCCESS,
    FETCH_TX_ERROR,
} from "redux/actions/data/tx.js";

//import tx from "containers/History/MOCK_DATA.json";

// Define initial state
const initialState = {
    pending: false,
    txList: [],
    error: null,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TX_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_TX_SUCCESS:
            return {
                ...state,
                pending: false,
                txList: action.payload.txList,
            };

        case FETCH_TX_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        default:
            return state;
    }
};
