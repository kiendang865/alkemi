// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";

// Section 3: Components & Containers import from the application

import { format_str_to_kmb, format_str_to_percent } from "utils/markets";

import MarketsTableCell from "components/UI/TableCell";
import Loading from "../Loading/LoadingTable";
// tokens icons
import WETH from "assets/images/WETH.svg";
import USDT from "assets/images/USDT.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
import PAX from "assets/images/pax.png";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        marginLeft: theme.spacing(1),
    },
    item: {
        textAlign: "left",
        justifyContent: "center",
    },
    assetImage: {
        width: 34,
    },
}));

// Section 5: Code Component
const TableMarkets = ({ marketsData }) => {
    const classes = useStyles();

    const tokens = {
        WETH: WETH,
        USDT: USDT,
        USDC: USDC,
        PAX: PAX,
        WBTC: WBTC,
        DAI: DAI,
    };

    return (
        <Card>
            <CardHeader title="MArket Liquidity" className={classes.header} />
            <Divider />
            <PerfectScrollbar>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <MarketsTableCell>
                                    {" "}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Market
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {" "}
                                        Gross Supply{" "}
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Deposit APR{" "}
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Gross Borrow
                                    </Typography>
                                </MarketsTableCell>
                                <MarketsTableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Borrow APR
                                    </Typography>
                                </MarketsTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!marketsData.length && (
                                <Loading colSpan={7} row={6} height={63} />
                            )}
                            {marketsData &&
                                marketsData.length > 0 &&
                                marketsData.map((item) => (
                                    <TableRow key={item.address}>
                                        <MarketsTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <Box
                                                minWidth={150}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <img
                                                    className={
                                                        classes.assetImage
                                                    }
                                                    alt={item.name}
                                                    src={tokens[item.symbol]}
                                                />
                                                <Box ml={2}>
                                                    <Typography
                                                        variant="h6"
                                                        color="textPrimary"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {item.symbol}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {" "}
                                                $
                                                {format_str_to_kmb(
                                                    item.totalSupplyUSD
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {format_str_to_percent(
                                                    item.supplyAPR
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {" "}
                                                $
                                                {format_str_to_kmb(
                                                    item.totalBorrowUSD
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                        <MarketsTableCell align="right">
                                            {" "}
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {format_str_to_percent(
                                                    item.borrowAPR
                                                )}
                                            </Typography>
                                        </MarketsTableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PerfectScrollbar>
        </Card>
    );
};

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default TableMarkets;
