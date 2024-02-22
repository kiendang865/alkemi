// Import action of interest as constants
import {
    BORROW_PENDING,
    BORROW_SUCCESS,
    BORROW_ERROR,
    REPAY_PENDING,
    REPAY_SUCCESS,
    REPAY_ERROR,
    RESET_BORROW_DATA,
} from "redux/actions/data/borrow";

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
        case "GOT_CONTRACT_VAR": {
            switch (action.variable) {
                case "balanceOf":
                    return {
                        ...state,
                        assets: {
                            ...state.assets,
                            [action.name]: {
                                ...state.assets[action.name],
                                wallet: action.value,
                            },
                        },
                    };
                default:
                    return state;
            }
        }
        case BORROW_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        borrowing: true,
                    },
                },
            };
        case BORROW_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        borrowing: false,
                        activated: true,
                    },
                },
            };

        case BORROW_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        borrowing: false,
                        error: action.error,
                    },
                },
            };

        case REPAY_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        repaying: true,
                    },
                },
            };
        case REPAY_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        repaying: false,
                        activated: true,
                    },
                },
            };

        case REPAY_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        repaying: false,
                        error: action.error,
                    },
                },
            };

        case RESET_BORROW_DATA:
            return initialState;

        default:
            return state;
    }
};
