// Import action of interest as constants
import {
    FETCH_LEND_PENDING,
    FETCH_LEND_SUCCESS,
    FETCH_LEND_ERROR,
} from "redux/actions/status/lend";
// import internal assets
import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import wbtc from "assets/images/WBTC.svg";
import usdt from "assets/images/USDT.svg";
import eth from "assets/images/WETH.svg";
import pax from "assets/images/pax.png";

function createData(name, unit, image, wallet) {
    return {
        name,
        unit,
        image,
        wallet,
        activated: false,
        pending: false,
        borrowing: false,
        repaying: false,
        redeeming: false,
    };
}

const assets = {
    WETH: createData("Ether", "WETH", eth, "0"),
    DAI: createData("Maker DAI", "DAI", dai, "0"),
    USDT: createData("Tether", "USDT", usdt, "0"),
    USDC: createData("USD Coin", "USDC", usdc, "0"),
    WBTC: createData("Wrapped Bitcoin", "WBTC", wbtc, "0"),
    PAX: createData("Paxos", "PAX", pax, "0"),
};

// Define initial state
const initialState = {
    assets,
    error: null,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEND_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        pending: true,
                        activated: false,
                    },
                },
            };
        case FETCH_LEND_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        pending: false,
                        activated: true,
                    },
                },
            };

        case FETCH_LEND_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        pending: false,
                        activated: false,
                        error: action.error,
                    },
                },
            };
        default:
            return state;
    }
};
