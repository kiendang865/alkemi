// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object
function MarketsIcon(props) {
    return (
        <SvgIcon {...props}>
            <path
                className="b"
                d="M19.338,18.675H1.325V.662A.662.662,0,1,0,0,.662V19.338A.662.662,0,0,0,.662,20H19.338a.662.662,0,1,0,0-1.325Z"
            />
            <path
                className="b"
                d="M47.55,308.823h4.356a.552.552,0,0,0,.552-.552V303.7a.552.552,0,0,0-.552-.552H47.55A.552.552,0,0,0,47,303.7v4.571A.552.552,0,0,0,47.55,308.823Zm.552-4.571h3.252v3.468H48.1Z"
                transform="translate(-44.404 -291.417)"
            />
            <path
                className="b"
                d="M169.7,183.383h4.356a.552.552,0,0,0,.552-.552v-11.9a.552.552,0,0,0-.552-.552H169.7a.552.552,0,0,0-.552.552v11.9A.552.552,0,0,0,169.7,183.383Zm.552-11.9H173.5v10.795h-3.252Z"
                transform="translate(-162.2 -165.977)"
            />
            <path
                className="b"
                d="M295.606,54.406h4.356c.3,0,.552-.186.552-.416V39.577c0-.23-.247-.416-.552-.416h-4.356c-.3,0-.552.186-.552.416V53.991C295.054,54.22,295.3,54.406,295.606,54.406Zm.552-14.414h3.252V53.575h-3.252Z"
                transform="translate(-283.769 -37)"
            />
        </SvgIcon>
    );
}

// Section 5: Code Component
const SidebarMarketsItem = ({ onClick, selected }) => (
    <ListItem
        icon={<MarketsIcon />}
        text="Markets"
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarMarketsItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarMarketsItem;
