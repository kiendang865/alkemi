import React from "react";
import toJson from "enzyme-to-json";

import Dashboard from "components/Dashboard/Dashboard";
import createShallow from "utils/tests-utils/createShallow";

describe("<Dashboard />", () => {
    let shallow;
    let wrapper;

    beforeAll(() => {
        shallow = createShallow({ dive: 1 });
    });
    beforeEach(() => {
        wrapper = shallow(<Dashboard />);
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
