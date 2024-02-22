import { combineReducers } from "redux";

import lend from "./lend";
import borrow from "./borrow";
import onboard from "./onboard";

export default combineReducers({
    lend,
    borrow,
    onboard,
    // other status reducers go here
});
