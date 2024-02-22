// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object
function LendIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                className="b"
                d="M89.545,219.583a.552.552,0,0,0-.552.552v.828a.552.552,0,0,0,1.1,0v-.828A.552.552,0,0,0,89.545,219.583Z"
                transform="translate(-84.362 -209.046)"
            />
            <path
                className="b"
                d="M20.668,26.016a.457.457,0,0,0-.564.315,1.206,1.206,0,0,1-.571.721,6.073,6.073,0,0,0-2.642-4.146A9.543,9.543,0,0,0,14,21.5a3.63,3.63,0,1,0-6.774.053,10.062,10.062,0,0,0-1.455.588A2.837,2.837,0,0,0,4.237,21.7H2.362a.685.685,0,0,0-.484,1.169l1.29,1.29a5.8,5.8,0,0,0-1.143,2.129H.685A.685.685,0,0,0,0,26.968v2.16a2.277,2.277,0,0,0,1.075,1.941,25.5,25.5,0,0,0,3.016,1.612v2.713a.685.685,0,0,0,.685.685H7.19a.685.685,0,0,0,.671-.549l.3-1.5a12.944,12.944,0,0,0,2.537.266,11.824,11.824,0,0,0,2.128-.191l.336,1.447a.685.685,0,0,0,.667.53H16.2a.685.685,0,0,0,.685-.685V32.425a6.063,6.063,0,0,0,2.671-4.4,2.127,2.127,0,0,0,1.427-1.449A.456.456,0,0,0,20.668,26.016ZM8.345,20.224a2.26,2.26,0,1,1,4.3.969,12.027,12.027,0,0,0-4.07.03A2.242,2.242,0,0,1,8.345,20.224Zm7.478,11.271a.685.685,0,0,0-.308.572v2.643H14.376l-.366-1.573a.685.685,0,0,0-.832-.51,10.312,10.312,0,0,1-2.478.3,12.144,12.144,0,0,1-2.9-.383.685.685,0,0,0-.836.529l-.331,1.64H5.461V32.234a.685.685,0,0,0-.416-.63,23.972,23.972,0,0,1-3.243-1.7.915.915,0,0,1-.432-.78V27.653h1.2a.685.685,0,0,0,.676-.576,4.238,4.238,0,0,1,.892-1.948l.03.03a.685.685,0,1,0,.968-.968L4.016,23.065h.221a1.468,1.468,0,0,1,1.31.8.685.685,0,0,0,1.217-.628L6.745,23.2a9.8,9.8,0,0,1,3.956-.8,9.2,9.2,0,0,1,5.384,1.61A4.58,4.58,0,0,1,18.2,27.663,4.732,4.732,0,0,1,15.823,31.494Z"
                transform="translate(4 -14.594)"
            />
        </SvgIcon>
    );
}

// Section 5: Code Component
const SidebarLendItem = ({ onClick, selected }) => (
    <ListItem
        icon={<LendIcon />}
        text="Lend"
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarLendItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarLendItem;
