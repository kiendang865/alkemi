import React from "react";
import PropTypes from "prop-types";

export default () => (Component) => {
    const DrizzledComponent = (props, context) => {
        const drizzle = context.drizzle;
        return (
            <Component
                {...props}
                store={context.drizzleStore}
                drizzle={drizzle}
            />
        );
    };

    DrizzledComponent.contextTypes = {
        drizzleStore: PropTypes.object,
        drizzle: PropTypes.object,
    };

    return DrizzledComponent;
};
