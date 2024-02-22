// 1. React/Redux low level imports
import thunk from "redux-thunk";

// 2. Libraries imports
import { generateStore } from "@drizzle/store";

// 3. internal imports
import appReducers from "redux/reducers";
import contractTXNotifier from "utils/notify";
import MoneyMarket from "contracts/MoneyMarket.json";

const appMiddlewares = [thunk, contractTXNotifier];

export const drizzleOptions = {
    drizzleOptions: {
        contracts: [MoneyMarket],
        events: {
            MoneyMarket: [
                "SupplyReceived",
                "SupplyWithdrawn",
                "BorrowTaken",
                "BorrowRepaid",
                "Failure",
            ],
        },
        web3: {
            customProvider: window.currentlyUsedProvider,
        },
    },
    polls: {
        blocks: 6000,
    },
    syncAlways: false,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false, // enable ReduxDevTools!
    networkWhitelist: [
        // Allows the listed networks
        //    1, // Mainnet
        //    3, // Ropsten
        4, // Rinkeby
        //      5, // Goerli
        //      42, // Kovan
    ],
};

const store = generateStore(drizzleOptions);
export default store;
