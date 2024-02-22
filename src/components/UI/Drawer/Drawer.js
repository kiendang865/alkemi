// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    Input,
    Grid,
    SvgIcon,
    Typography,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { XCircle as XIcon } from "react-feather";

// Section 3: Components & Containers import from the application
import Chart from "./ChartWrapper";
import { formatPercent } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const DrawerClass = makeStyles((theme) =>
    createStyles({
        supplyPercent: {
            letterSpacing: "0px",
            color: "#00A577",
            opacity: 1,
            fontSize: "28px",
            fontWeight: "500",
            textAlign: "center",
            // backgroundColor:'#1B1B1B',
            padding: "25px 0",
        },
        drawer: {
            width: "100%",
            "@media (min-width: 780px)": {
                width: 380,
            },
        },
        btnDrawer: {
            minWidth: 100,
            textTransform: "capitalize",
            fontWeight: 500,
            minHeight: 32,
        },
        inputWrap: {
            position: "relative",
        },
        maxTips: {
            position: "absolute",
            right: "15px",
            top: "17px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: "14px",
        },
        input: {
            background: "#1B1B1B 0% 0% no-repeat padding-box",
            border: "1px solid #000000",
            opacity: 1,
            height: "54px",
            paddingLeft: "10px",
            color: "white",
            fontSize: "18px",
        },
        amount: {
            color: "white",
            paddingBottom: "10px",
        },
        rateInfo: {
            color: "white",
            fontSize: "14px",
            marginTop: "20px",
        },
        rateRow: {
            padding: "12px 0",
            borderBottom: "1px dashed #a7a7a7",
        },
        walletBalance: {
            color: "#a7a7a7",
        },
    })
);

const DrawerWrapper = ({
    asset,
    enableButtonClick,
    onButtonClick,
    usdPrice,
    onSetMax,
    amount,
    setAmount,
    mainTitle,
    balanceValue,
    isDoingAction,
    buttonsLabel,
    triggerButtonColor,
    triggerButtonVariant,
    amountValue,
}) => {
    const classes = DrawerClass();

    // UI state
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    return (
        <>
            <Button
                type="button"
                className={classes.btnDrawer}
                variant={triggerButtonVariant}
                size="small"
                color={triggerButtonColor}
                onClick={handleOpen}
            >
                {isDoingAction ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    buttonsLabel
                )}
            </Button>
            <Drawer
                anchor="right"
                classes={{ paper: classes.drawer }}
                ModalProps={{ BackdropProps: { invisible: false } }}
                onClose={handleClose}
                open={isOpen}
                variant="temporary"
            >
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                    >
                        <Typography variant="h4" color="textPrimary">
                            {mainTitle}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box p={2} bgcolor="background.dark">
                        <div className={classes.supplyPercent}>
                            {formatPercent(asset.apr)} APR
                        </div>

                        <Chart> </Chart>
                    </Box>
                    <Box p={2} mt={3}>
                        <Grid container className={classes.amount}>
                            <Grid item md={6} xs>
                                Amount
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs
                                container
                                justify="flex-end"
                                className={classes.walletBalance}
                            >
                                {amountValue}
                            </Grid>
                        </Grid>
                        <div className={classes.inputWrap}>
                            <Input
                                autoFocus={true}
                                disableUnderline={true}
                                className={classes.input}
                                placeholder="0.00"
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                fullWidth={true}
                            />
                            <span
                                className={classes.maxTips}
                                onClick={onSetMax}
                            >
                                MAX
                            </span>
                            {/* onClick={() => { click_max(this) }} */}
                        </div>
                        <Grid className={classes.rateInfo}>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Market Utilization
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {formatPercent(asset.utilization)}
                                </Grid>
                            </Grid>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Price
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {usdPrice}
                                </Grid>
                            </Grid>
                            <Grid container className={classes.rateRow}>
                                <Grid item md={6} xs>
                                    Balance
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    {balanceValue}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box className={classes.sendButtonDiv} mt={4}>
                            <Button
                                type="button"
                                className={classes.btnModal}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    onButtonClick({ asset, amount });
                                    handleClose();
                                }}
                                disabled={!enableButtonClick || isDoingAction}
                                size="large"
                                fullWidth={true}
                            >
                                {isDoingAction ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    buttonsLabel
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

DrawerWrapper.propTypes = {
    asset: PropTypes.object.isRequired,
    enableButtonClick: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    usdPrice: PropTypes.string, // It starts as null
    onSetMax: PropTypes.func.isRequired,
    amount: PropTypes.string.isRequired,
    setAmount: PropTypes.func.isRequired,
    mainTitle: PropTypes.string.isRequired,
    balanceValue: PropTypes.string.isRequired,
    isDoingAction: PropTypes.bool, // starts as undefined
    buttonsLabel: PropTypes.string.isRequired,
    triggerButtonColor: PropTypes.string, // not required
    triggerButtonVariant: PropTypes.string,
    amountValue: PropTypes.string.isRequired,
};

export default DrawerWrapper;
