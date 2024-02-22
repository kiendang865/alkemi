import React from "react";
import { useSelector } from "react-redux";
import { DrizzleProvider } from "@drizzle/react-plugin";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore.js";

import { isWalletConnected } from "redux/selectors/onboard";

export default ({ children }) => {
    const shouldInjectDrizzle = useSelector(isWalletConnected);

    return shouldInjectDrizzle === true ? (
        <DrizzleProvider store={store} options={drizzleOptions}>
            {children}
        </DrizzleProvider>
    ) : (
        children
    );
};
