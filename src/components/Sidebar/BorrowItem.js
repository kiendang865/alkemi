// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object
function BorrowIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                className="a"
                d="M21.866,39.6l-3.2-4.372a4.5,4.5,0,0,0-2.9-1.788,6.688,6.688,0,0,0,1.139-3.758,6.754,6.754,0,1,0-9.98,5.933,1.737,1.737,0,0,0,1.637,1.316l4.034.09a.277.277,0,0,1,.269.3.278.278,0,0,1-.276.251h0L7.954,37.5a1.138,1.138,0,0,1-.7-.258l-4.1-3.376a1.926,1.926,0,0,0-2.532,2.9L5.833,41.6a3.66,3.66,0,0,0,2.364.972l7.748.259h.023a.686.686,0,0,0,.022-1.372L8.243,41.2a2.287,2.287,0,0,1-1.477-.607l-5.217-4.83a.554.554,0,0,1,.728-.834L6.38,38.3a2.515,2.515,0,0,0,1.553.57l4.634.072h.026a1.65,1.65,0,0,0,.037-3.3L8.6,35.555a.355.355,0,0,1-.344-.331.353.353,0,0,1,.347-.374l6.444-.094h.1a3.086,3.086,0,0,1,2.42,1.279l3.2,4.372a.686.686,0,1,0,1.108-.81ZM8.579,33.477a1.733,1.733,0,0,0-1.239.551,1.7,1.7,0,0,0-.127.155,5.381,5.381,0,1,1,8.324-4.505A5.327,5.327,0,0,1,14.043,33.4l-3.431.05V33.2a2.015,2.015,0,0,0,0-3.924V27.121a1.1,1.1,0,0,1,.643,1,.458.458,0,0,0,.915,0,2.018,2.018,0,0,0-1.558-1.962v-.317a.458.458,0,0,0-.915,0v.317a2.015,2.015,0,0,0,0,3.924v2.153a1.1,1.1,0,0,1-.643-1,.458.458,0,0,0-.915,0A2.018,2.018,0,0,0,9.7,33.2v.263ZM9.7,29.121a1.1,1.1,0,0,1,0-2Zm.915,1.115a1.1,1.1,0,0,1,0,2Z"
                transform="translate(0.001 -22.925)"
            />
        </SvgIcon>
    );
}

// Section 5: Code Component
const SidebarBorrowItem = ({ onClick, selected }) => (
    <ListItem
        icon={<BorrowIcon />}
        text="Borrow"
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarBorrowItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarBorrowItem;
