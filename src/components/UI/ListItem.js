// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    item: {
        paddingLeft: 23,
        paddingRight: 23,
    },
    selected: {
        borderLeftStyle: "solid",
        borderWidth: 2,
        borderColor: theme.palette.common.white,
        backgroundColor: theme.palette.common.darkGrey,
    },
}));

// Section 5: Code Component
const ListItem1 = ({ icon, text, onClick, selected, ...props }) => {
    const classes = useStyles();
    return (
        <ListItem
            button
            onClick={onClick}
            {...props}
            className={clsx(classes.item, { [classes.selected]: selected })}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};

// Section 6: Documentation with PropTypes
ListItem1.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default ListItem1;
