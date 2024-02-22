// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: UI imports
import { withStyles } from "@material-ui/core/styles";

// Section 3: Components & Containers import from the application
import LayoutContent from "containers/Layout/Content";
import Sidebar from "containers/Sidebar/Sidebar";
import AppBar from "containers/AppBar/AppBar";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    frame: {
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100%",
    },
    content: {
        position: "relative",
        width: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        marginLeft: 32,
        marginRight: 32,
        "@media (min-width: 1720px)": {
            maxWidth: "1280px",
            margin: "0 auto",
        },
        "@media (max-width:1024px)": {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
        },
    },
    contentShifted: {
        width: "calc(100% - 400px)",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        //marginTop: 56,
        marginTop: "100px",
        marginLeft: "125px",
        marginRight: "100px",
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
            marginTop: 100,
        },
        "@media (min-width: 1550px)": {
            marginLeft: "50px!important",
            marginRight: "25px!important",
        },
    },
});

// Section 5: Code Component
const LayoutSkeleton = ({ classes }) => (
    <div className={classes.frame}>
        <Sidebar />

        <div className={classes.content}>
            <AppBar />

            <LayoutContent />
        </div>
    </div>
);

// Section 6: Documentation with PropTypes
LayoutSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Section 7:  Connect styles and export
export default withStyles(styles)(LayoutSkeleton);
