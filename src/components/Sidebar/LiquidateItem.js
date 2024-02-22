// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object
function LiquidateIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                className="a"
                d="M10.5,13.109a4.409,4.409,0,0,0,4.4-4.4c0-4.2-3.642-8.264-3.8-8.435a.82.82,0,0,0-1.215,0C9.736.441,6.095,4.5,6.095,8.7a4.409,4.409,0,0,0,4.4,4.4Zm0-10.991c.971,1.27,2.763,3.967,2.763,6.587a2.764,2.764,0,0,1-5.527,0c0-2.612,1.793-5.315,2.765-6.587ZM20.179,12.8H15.063a.82.82,0,0,0-.777.559,3.995,3.995,0,0,1-7.573,0,.82.82,0,0,0-.777-.559H.819a.82.82,0,0,0-.82.82V20.18a.82.82,0,0,0,.82.82H20.179a.82.82,0,0,0,.82-.82V13.618a.82.82,0,0,0-.82-.82Zm-.82,6.562H1.64V14.438H5.379a5.635,5.635,0,0,0,10.24,0h3.739Zm0,0"
                transform="translate(0.001 0)"
            />
        </SvgIcon>
    );
}

// Section 5: Code Component
const SidebarLiquidateItem = ({ onClick, selected }) => (
    <ListItem
        icon={<LiquidateIcon />}
        text="Liquidate"
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarLiquidateItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarLiquidateItem;
