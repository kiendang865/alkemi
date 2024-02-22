// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    fade,
    Switch,
    Table,
    TableBody,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

//import DrawerBorrow from "components/UI/DrawerBorrow";
import BorrowDrawerBorrow from "containers/Borrow/DrawerBorrow";
import BorrowDrawerRepay from "containers/Borrow/DrawerRepay";
import BorrowTableCell from "components/UI/TableCell";
import { formatNumber, formatPercent } from "utils/ui";

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
        width: "34px",
        height: "34px",
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
        height: 24,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        padding: theme.spacing(0.5, 0.5),
        textTransform: "uppercase",
        color: theme.palette.error.main,
        backgroundColor: fade(theme.palette.error.main, 0.1),
    },
    btnActiveOutline: {
        minWidth: 100,
        minHeight: 32,
        textTransform: "capitalize",
    },
    heading: {
        fontWeight: 500,
    },
}));

// Section 5: Code Component
const BorrowTableActive = ({ data = [] }) => {
    const classes = useStyles();
    return (
        <Box mt={2}>
            <Typography
                className={classes.heading}
                variant="h6"
                color="textPrimary"
            >
                Active Borrowed
            </Typography>
            <PerfectScrollbar>
                <Table className={classes.root}>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name} className={classes.row}>
                                <BorrowTableCell
                                    className={classes.startcell}
                                    component="th"
                                    scope="row"
                                    style={{ width: "16%" }}
                                >
                                    <Box
                                        minWidth={150}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <img
                                            className={classes.imageSize}
                                            src={row.image}
                                            alt={row.name}
                                        />
                                        <Box ml={2}>
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
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
                                <BorrowTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {formatNumber(row.wallet, row.unit)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Available
                                    </Typography>
                                </BorrowTableCell>
                                <BorrowTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {formatNumber(row.balance, row.unit)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Borrowed
                                    </Typography>
                                </BorrowTableCell>
                                <BorrowTableCell
                                    align="center"
                                    style={{ width: "16%" }}
                                >
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
                                    align="center"
                                    style={{ width: "16%" }}
                                >
                                    <Switch
                                        // checked={state.checkedB}
                                        // onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                </BorrowTableCell>
                                <BorrowTableCell
                                    align="center"
                                    className={classes.endcell}
                                >
                                    <Box
                                        minWidth={208}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <Box mr={1}>
                                            <BorrowDrawerRepay asset={row} />
                                        </Box>
                                        <BorrowDrawerBorrow asset={row} />
                                    </Box>
                                </BorrowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
        </Box>
    );
};

// Section 6: Documentation with PropTypes
BorrowTableActive.propTypes = {
    data: PropTypes.array.isRequired,
};

// Section 7:  Connect styles and export
export default BorrowTableActive;
