// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object
function HistoryIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                className="b"
                d="M11.32,5.66v4.5l2.986,2.986a.82.82,0,1,1-1.16,1.16L9.92,11.08a.82.82,0,0,1-.24-.58V5.66a.82.82,0,0,1,1.641,0ZM13.727,0H7.273A7.248,7.248,0,0,0,2.5,1.783V.82A.82.82,0,1,0,.863.82V4.047a.822.822,0,0,0,.82.82H4.91a.82.82,0,1,0,0-1.641H3.358A5.652,5.652,0,0,1,7.273,1.641h6.453a5.639,5.639,0,0,1,5.633,5.633v6.453a5.639,5.639,0,0,1-5.633,5.633H7.273a5.639,5.639,0,0,1-5.633-5.633V10.5A.82.82,0,1,0,0,10.5v3.227A7.282,7.282,0,0,0,7.273,21h6.453A7.282,7.282,0,0,0,21,13.727V7.273A7.282,7.282,0,0,0,13.727,0Z"
            />
        </SvgIcon>
    );
}

// Section 5: Code Component
const SidebarHistoryItem = ({ onClick, selected }) => (
    <ListItem
        icon={<HistoryIcon />}
        text="History"
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarHistoryItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarHistoryItem;
