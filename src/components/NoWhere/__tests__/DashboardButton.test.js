import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Button from "@material-ui/core/Button";

import NoWhereDashboardButton from "../DashboardButton";

describe("<BackDashboardButton />", () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            onClick: jest.fn(),
        };
        wrapper = shallow(<NoWhereDashboardButton {...props} />).dive();
    });

    it("renders 1 Button", () => {
        expect(wrapper.find(Button).length).toEqual(1);
    });

    it("Button is functional", () => {
        wrapper.find(Button).at(0).simulate("click");
        expect(props.onClick.mock.calls.length).toEqual(1);
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
