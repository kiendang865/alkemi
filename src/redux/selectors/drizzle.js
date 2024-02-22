// Libs
// import { createSelector } from "reselect";
import constants from "constants/constant.json";

// Drizzle state selector
export const networkSelector = (state) =>
    constants.network_type[state.web3.networkId]; // Not the source of truth, to be cleaned up in UI-249
