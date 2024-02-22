// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import MuiAppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
    Button,
    Grid,
    Hidden,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import Settings from "./Settings";
import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    statusBadge: {
        backgroundColor: theme.palette.success.main,
        width: "9px",
        height: "9px",
        borderRadius: "5px",
        marginRight: "12px",
    },
    connectWallet: {
        minWidth: 130,
    },
    appBar: {
        paddingLeft: "16px",
        paddingRight: "16px",
        "@media (min-width:1550px)": {
            paddingLeft: "0px",
            paddingRight: "0px",
        },
    },
}));

// Section 5: Code Component
function AppBar({
    title,
    onConnect,
    onReset,
    accountAddress,
    onMobileNavOpen,
    ...rest
}) {
    const classes = useStyles();
    const addressParser = (address) =>
        `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOnConnect = (event) => {
        onConnect();
        setAnchorEl(null);
    };

    const handleOnReset = () => {
        onReset();
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MuiAppBar
            color="transparent"
            position="relative"
            className={classes.appBar}
        >
            <Toolbar disableGutters={true}>
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-start"
                    wrap="nowrap"
                >
                    <Grid item>
                        <Hidden lgUp>
                            <MobileMenu />
                        </Hidden>
                        <Hidden mdDown>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                OVERVIEW
                            </Typography>
                            <Typography variant="h3" color="textPrimary">
                                {title}
                            </Typography>
                        </Hidden>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        justify="flex-end"
                    >
                        <Grid item>
                            <Settings />
                            <Notifications />
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.connectWallet}
                                type="button"
                                variant="outlined"
                                color="secondary"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={
                                    accountAddress
                                        ? handleClick
                                        : handleOnConnect
                                }
                            >
                                <Grid className={classes.statusBadge}></Grid>
                                <Grid className={classes.price}>
                                    {/* 0x121565...6456 */}
                                    {accountAddress
                                        ? addressParser(accountAddress)
                                        : "Connect"}
                                </Grid>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleOnConnect}>
                                    Change Wallet
                                </MenuItem>
                                {accountAddress ? (
                                    <MenuItem onClick={handleOnReset}>
                                        Disconnect Wallet
                                    </MenuItem>
                                ) : null}
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </MuiAppBar>
    );
}

// Section 6: Documentation with PropTypes
AppBar.propTypes = {
    onMobileNavOpen: PropTypes.func,
};

// Section 7:  Connect styles and export
export default AppBar;
