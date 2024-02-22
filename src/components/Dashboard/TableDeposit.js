// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    fade,
    Table,
    TableBody,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

//import { useHistory } from "react-router-dom";
import DepositTableCell from "components/UI/TableCell";
import Loading from "../Loading/LoadingTable";
import {
    formatNumber,
    formatPercent,
    //    formatMoney,
    calculateEarnings,
} from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        borderCollapse: "separate",
        borderSpacing: "0 1em",
    },
    startcell: {
        borderRadius: "6px 0px 0px 6px",
    },
    endcell: {
        borderRadius: "0px 6px 6px 0px",
    },
    row: {
        backgroundColor: theme.palette.background.paper,
    },
    imageSize: {
        width: "30px",
        height: "30px",
    },
    label: {
        fontFamily: theme.typography.fontFamily,
        alignItems: "center",
        borderRadius: 2,
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
        height: 16,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        padding: theme.spacing(0.5, 0.5),
        textTransform: "uppercase",
        color: theme.palette.success.main,
        backgroundColor: fade(theme.palette.success.main, 0.08),
    },
}));

export default function DepositTables({ activeReserves, USDPrice }) {
    const classes = useStyles();
    //  let history = useHistory();
    // Section 5: Code Component
    return (
        <PerfectScrollbar>
            <Table className={classes.root}>
                <TableBody>
                    {!activeReserves.length && (
                        <Loading colSpan={7} row={8} height={63} />
                    )}
                    {activeReserves.map((row) => (
                        <TableRow key={row.unit} className={classes.row}>
                            <DepositTableCell
                                component="th"
                                scope="row"
                                className={classes.startcell}
                            >
                                <Box
                                    minWidth={100}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <img
                                        className={classes.imageSize}
                                        src={row.image}
                                        alt={row.symbol}
                                    />
                                    <Box ml={2}>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {row.symbol}
                                            {row.unit}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {row.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </DepositTableCell>
                            <DepositTableCell align="right">
                                <Typography variant="h6" color="textPrimary">
                                    {formatNumber(row.wallet, row.unit)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Wallet
                                </Typography>
                            </DepositTableCell>
                            <DepositTableCell align="right">
                                <Typography variant="h6" color="textPrimary">
                                    {formatNumber(row.balance, row.unit)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Supplied
                                </Typography>
                            </DepositTableCell>
                            <DepositTableCell align="right">
                                <Typography
                                    variant="h6"
                                    className={classes.label}
                                >
                                    {formatPercent(row.apr)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    APR
                                </Typography>
                            </DepositTableCell>
                            <DepositTableCell
                                align="right"
                                className={classes.endcell}
                            >
                                <Typography variant="h6" color="textPrimary">
                                    {calculateEarnings(
                                        row.balance,
                                        row.principal,
                                        row.unit,
                                        USDPrice
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Earnings
                                </Typography>
                            </DepositTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </PerfectScrollbar>
    );
}
