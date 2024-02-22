// Import action of interest as constants
import {
    ALLOCATE_PENDING,
    ALLOCATE_SUCCESS,
    ALLOCATE_ERROR,
    APPROVE_PENDING,
    APPROVE_SUCCESS,
    APPROVE_ERROR,
    DEPOSIT_PENDING,
    DEPOSIT_SUCCESS,
    DEPOSIT_ERROR,
    WITHDRAW_PENDING,
    WITHDRAW_SUCCESS,
    WITHDRAW_ERROR,
    RESET_LEND_DATA,
} from "redux/actions/data/lend";
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
        activating: false,
        approving: false,
        pending: false,
        allocating: false,
        depositing: false,
        borrowing: false,
        repaying: false,
        withdrawing: false,
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
        case DEPOSIT_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: true,
                        activating: true,
                    },
                },
            };
        case DEPOSIT_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: false,
                        activated: true,
                    },
                },
            };

        case DEPOSIT_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        depositing: false,
                        activating: false,
                        error: action.error,
                    },
                },
            };

        case WITHDRAW_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: true,
                    },
                },
            };
        case WITHDRAW_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: false,
                        activated: true,
                    },
                },
            };

        case WITHDRAW_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        withdrawing: false,
                        error: action.error,
                    },
                },
            };
        case APPROVE_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: true,
                    },
                },
            };
        case APPROVE_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: false,
                        activated: true,
                    },
                },
            };

        case APPROVE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        approving: false,
                        error: action.error,
                    },
                },
            };
        case ALLOCATE_PENDING:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        allocating: true,
                        activating: false,
                    },
                },
            };
        case ALLOCATE_SUCCESS:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        allocating: false,
                        activated: false,
                        pending: false,
                    },
                },
            };

        case ALLOCATE_ERROR:
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [action.payload.asset]: {
                        ...state.assets[action.payload.asset],
                        allocating: false,
                        activating: false,
                        error: action.error,
                    },
                },
            };

        case RESET_LEND_DATA:
            return initialState;

        default:
            return state;
    }
};
