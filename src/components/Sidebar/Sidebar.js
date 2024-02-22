// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    withWidth,
    withStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarHeader from "containers/Sidebar/Header";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    drawer: {
        width: 280,
        marginLeft: 24,
        flexShrink: 0,
        "@media (min-width:1550px)": {
            marginLeft: 35,
            width: 340,
        },
    },
    drawerInner: {
        overflowX: "hidden",
    },
    drawerOpen: {
        width: 280,
        "@media (min-width:1550px)": {
            width: 340,
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 70,
        [theme.breakpoints.up("sm")]: {
            width: 70,
        },
        "&:hover": {
            width: 280,
            "@media (min-width:1550px)": {
                width: 340,
            },
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    drawerPaper: {
        // width: drawerWidth,
        margin: "22px 0px 0px 24px",
        "@media (min-width:1550px)": {
            margin: "22px 0px 0px 35px",
        },
        background: "#202123",
        color: "white",
        border: "none",
    },
    divider: {
        backgroundColor: theme.palette.common.black,
    },
});

// Section 5: Code Component
function Sidebar({ classes, width, variant, open }) {
    const content = (
        <div className={classes.drawerInner}>
            <SidebarHeader />
            <Divider className={classes.divider} />
            <Box pt={1} pb={1}>
                <List className={classes.list}>
                    <SidebarDashboardItem />
                    <SidebarLendItem />
                    <SidebarBorrowItem />
                    <SidebarMarketsItem />
                    <SidebarHistoryItem />
                </List>
            </Box>
            <Divider className={classes.divider} />
        </div>
    );

    return (
        <>
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx(classes.drawerPaper, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    anchor="left"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
}

// Section 6: Documentation with PropTypes
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    variant: PropTypes.string,
    open: PropTypes.bool,
};

// Section 7:  Connect styles and export
export default compose(withWidth(), withStyles(styles))(Sidebar);
