import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Route, Switch } from "react-router";

import LayoutContent from "../Content";
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

describe("<LayoutContent />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LayoutContent />);
    });

    it("renders 1 <Switch /> components", () => {
        expect(wrapper.find(Switch).length).toEqual(1);
    });

    it("renders 7 <Route /> components", () => {
        expect(wrapper.find(Route).length).toEqual(7);
    });

    it("route 1 renders a <Dashboard /> component", () => {
        expect(wrapper.find(Route).at(0).props().path).toEqual(DASHBOARD);
        expect(wrapper.find(Route).at(0).props().component).toEqual(Dashboard);
    });

    it("route 2 renders a <Lend /> container", () => {
        expect(wrapper.find(Route).at(1).props().path).toEqual(LEND);
        expect(wrapper.find(Route).at(1).props().component).toEqual(Lend);
    });

    it("route 3 renders a <Borrow /> container", () => {
        expect(wrapper.find(Route).at(2).props().path).toEqual(BORROW);
        expect(wrapper.find(Route).at(2).props().component).toEqual(Borrow);
    });

    it("route 4 renders a <Markets /> component", () => {
        expect(wrapper.find(Route).at(3).props().path).toEqual(MARKETS);
        expect(wrapper.find(Route).at(3).props().component).toEqual(Markets);
    });

    it("route 5 renders a <History /> container", () => {
        expect(wrapper.find(Route).at(4).props().path).toEqual(HISTORY);
        expect(wrapper.find(Route).at(4).props().component).toEqual(History);
    });

    it("route 7 renders a <NoWhere /> component", () => {
        expect(wrapper.find(Route).at(6).props().component).toEqual(NoWhere);
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
