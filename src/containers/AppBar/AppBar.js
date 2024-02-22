// Main Container

// Section 1: React low level imports
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";

// Section 2: internal imports
import withDrizzle from "containers/Drizzle/withDrizzle";

import onboard from "utils/onboard";

import { initContracts, deleteAllContracts } from "utils/contracts";
import { resetLendData } from "redux/actions/data/lend";
import { resetBorrowData } from "redux/actions/data/borrow";

import {
    setWalletConnected,
    setWalletAddress,
} from "redux/actions/status/onboard";

// Section 3: Selectors
import { isWalletConnected, walletAddress } from "redux/selectors/onboard";

// Section 4: components
import AppBar from "components/AppBar/AppBar";
import Web3 from "web3";

const locationToTitles = {
    "/dashboard": "Dashboard",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Markets",
    "/history": "History",
    "/liquidate": "Liquidate",
    "/connect": "Connect",
};

// Section 5: Code Component
const AppBarContainer = ({ drizzle }) => {
    // Should be moved to an onboard manager probably
    const dispatch = useDispatch();
    const walletConnected = useSelector(isWalletConnected);

    const currentAddress = useSelector(walletAddress);

    let location = useLocation();
    // update Appbar title whenever location change
    const [title, setTitle] = useState("Not Set");
    useEffect(() => {
        var currentTitle =
            locationToTitles[location.pathname] || "404 Page Not Found";
        setTitle(currentTitle);
    }, [location]);

    // get previous selected wallet
    useEffect(() => {
        const checkIfPreviouslySelectedWallet = async () => {
            const previouslySelectedWallet = window.localStorage.getItem(
                "selectedWallet"
            );

            if (
                previouslySelectedWallet !== undefined &&
                typeof previouslySelectedWallet === "string" && // comment these two conditions to show wallet selection on load/disconnect
                onboard
            ) {
                const isSelectWallet = await onboard.walletSelect(
                    previouslySelectedWallet
                );

                if (isSelectWallet) {
                    const readyToTransact = await onboard.walletCheck();

                    if (window.currentlyUsedProvider) {
                        // set current address from chosen provider in onboard
                        dispatch(
                            setWalletAddress(
                                window.currentlyUsedProvider.selectedAddress
                            )
                        );
                    }

                    dispatch(setWalletConnected(readyToTransact));

                    if (!readyToTransact) {
                        // TODO: if it is not ready -> show some warning
                    }
                }
            }
        };

        checkIfPreviouslySelectedWallet();
    }, [dispatch]);

    const resetStoreData = useCallback(() => {
        dispatch(resetLendData());
        dispatch(resetBorrowData());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    // When disconnected
    const onReset = useCallback(async () => {
        onboard.walletReset();

        window.localStorage.removeItem("selectedWallet");

        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));

        dispatch(setWalletAddress(null));

        resetStoreData();
    }, [dispatch, resetStoreData, drizzle]);

    useEffect(() => {
        const initDrizzleData = (forceUpdate = false) => {
            if (walletConnected === true) {
                if (drizzle && !forceUpdate) {
                    drizzle.web3 = new Web3(window.currentlyUsedProvider); // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address
                }

                // account connected
                initContracts(drizzle, forceUpdate);

                if (drizzle && drizzle.web3 && drizzle.web3.currentProvider) {
                    drizzle.web3.currentProvider.removeAllListeners(
                        "accountsChanged"
                    );
                    drizzle.web3.currentProvider.removeAllListeners(
                        "chainChanged"
                    );

                    drizzle.web3.currentProvider.on(
                        "accountsChanged",
                        (accounts) => {
                            resetStoreData();

                            // Could be commented out in the current state as try/catch in contracts.js will catch it anyway
                            // (or the current clean up in contracts can be kept as it is)
                            deleteAllContracts(drizzle);

                            dispatch(setWalletAddress(accounts[0]));

                            initDrizzleData(true);
                        }
                    );

                    drizzle.web3.currentProvider.on(
                        "networkChanged",
                        (/*newNetworkId*/) => {
                            resetStoreData();

                            deleteAllContracts(drizzle);

                            initDrizzleData(true);
                        }
                    );
                }
            }
        };

        initDrizzleData();
    }, [drizzle, walletConnected, resetStoreData, dispatch]);

    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        if (isSelectWallet) {
            const readyToTransact = await onboard.walletCheck();
            dispatch(setWalletConnected(readyToTransact));

            if (!readyToTransact) {
                // TODO: if it is not ready -> show some warning
            }
        }
    };

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={walletConnected ? currentAddress : null}
        />
    );
};

// Export
export default compose(withDrizzle())(AppBarContainer);
