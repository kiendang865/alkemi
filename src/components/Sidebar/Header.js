// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Section 2: Material-UI imports
import { Hidden, withStyles } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Section 3: Components & Containers import from the application
import logo from "assets/images/alkemi.png";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        ...theme.mixins.toolbar,
        justifyContent: "space-between",
        width: "inherit",
        overflow: "hidden",
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        width: "163px",
        height: "27px",
    },
    menu: {
        width: 35,
        height: 35,
        padding: 0,
    },
    activeMenu: {
        backgroundColor: "#151617",
    },
});

// Section 5: Code Component
const SidebarHeader = ({ classes, open, onOpen, onClose }) => {
    return (
        <div className={classes.drawerHeader}>
            <img className={classes.image} src={logo} alt={"Alkemi Logo"} />
            <Hidden mdDown>
                <IconButton
                    onClick={open ? onClose : onOpen}
                    className={clsx(classes.menu, {
                        [classes.activeMenu]: open,
                    })}
                >
                    <MenuIcon fontSize="small" />
                </IconButton>
            </Hidden>
        </div>
    );
};

// Section 6: Documentation with PropTypes
SidebarHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default withStyles(styles)(SidebarHeader);
