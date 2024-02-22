import { applyMiddleware } from "redux";

import router from "./router";
import thunk from "./thunk";

const middlewares = [
    router,
    thunk,
    // other middlewares go here
];
export default applyMiddleware(...middlewares);
