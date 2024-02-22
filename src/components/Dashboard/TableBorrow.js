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

// Section 3: Components & Containers import from the application

//import { useHistory } from "react-router-dom";
import BorrowTableCell from "components/UI/TableCell";
import { formatNumber, formatPercent, calculateEarnings } from "utils/ui";
import Loading from "../Loading/LoadingTable";

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
        color: theme.palette.error.main,
        backgroundColor: fade(theme.palette.error.main, 0.1),
    },
}));

export default function BorrowTables({ activeReserves, USDPrice }) {
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
                            <BorrowTableCell
                                component="th"
                                scope="Row"
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
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography variant="h6" color="textPrimary">
                                    {formatNumber(row.wallet, row.unit)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Wallet
                                </Typography>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography variant="h6" color="textPrimary">
                                    {formatNumber(row.balance, row.unit)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Borrowed
                                </Typography>
                            </BorrowTableCell>
                            <BorrowTableCell align="right">
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
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
                            </BorrowTableCell>
                            <BorrowTableCell
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
                                    EARNINGS
                                </Typography>
                            </BorrowTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </PerfectScrollbar>
    );
}
