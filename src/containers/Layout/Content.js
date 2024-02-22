import React from "react";
import { Route, Switch } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";

import Dashboard from "containers/Dashboard/Dashboard";
import Lend from "containers/Lend/Lend";
import Borrow from "containers/Borrow/Borrow";
import Markets from "containers/Markets/Markets";
import History from "containers/History/History";
import Liquidate from "components/Liquidate/Liquidate";
import NoWhere from "components/NoWhere/NoWhere";

import {
    DASHBOARD,
    LEND,
    BORROW,
    MARKETS,
    HISTORY,
    LIQUIDATE,
} from "constants/routes";

const LayoutContent = () => (
    <div>
        <ToastContainer />
        <Switch>
            <Route path={DASHBOARD} exact component={Dashboard} />
            <Route path={LEND} exact component={Lend} />
            <Route path={BORROW} exact component={Borrow} />
            <Route path={MARKETS} exact component={Markets} />
            <Route path={HISTORY} exact component={History} />
            <Route path={LIQUIDATE} exact component={Liquidate} />
            <Route component={NoWhere} />
        </Switch>
    </div>
);

export default LayoutContent;
