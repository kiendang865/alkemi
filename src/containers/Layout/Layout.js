import React from "react";
import { Switch, Route, Redirect } from "react-router";

import LayoutSkeleton from "components/Layout/Skeleton";
import { DASHBOARD } from "constants/routes";

const Layout = () => (
    <Switch>
        <Route path="/" exact component={() => <Redirect to={DASHBOARD} />} />
        <Route component={LayoutSkeleton} />{" "}
    </Switch>
);

export default Layout;
