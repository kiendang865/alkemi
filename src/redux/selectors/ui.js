// Libs
import { matchPath } from "react-router";
import { createSelector } from "reselect";

// Constants
import {
    DASHBOARD,
    LEND,
    BORROW,
    MARKETS,
    HISTORY,
    LIQUIDATE,
} from "../../constants/routes";

// Item selection selector
const getPathName = (state, props) => state.router.location.pathname;

export const isDashboardSelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: DASHBOARD })
);

export const isLendSelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: LEND })
);

export const isBorrowSelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: BORROW })
);

export const isMarketsSelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: MARKETS })
);

export const isHistorySelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: HISTORY })
);

export const isLiquidateSelected = createSelector(
    getPathName,
    (pathname) => !!matchPath(pathname, { path: LIQUIDATE })
);
