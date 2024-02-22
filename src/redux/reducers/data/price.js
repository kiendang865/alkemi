// Import action of interest as constants
import {
    FETCH_PRICE_PENDING,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_ERROR,
} from "redux/actions/data/price";

// Define initial state
const initialState = {
    usdPrice: "0",
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRICE_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_PRICE_SUCCESS:
            return {
                ...state,
                pending: false,
                usdPrice: action.payload.price,
            };

        case FETCH_PRICE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        default:
            return state;
    }
};
