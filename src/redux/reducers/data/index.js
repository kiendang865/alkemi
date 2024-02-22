import { combineReducers } from "redux";

import tx from "./tx";
import lend from "./lend";
import borrow from "./borrow";
import price from "./price";

export default combineReducers({
    tx,
    lend,
    borrow,
    price,
    // other data reducers go here
});
