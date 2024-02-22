// Sub Component

// Section 1: React low level imports
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    CircularProgress,
    fade,
    Switch,
    Table,
    TableBody,
    TableRow,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowTableCell from "components/UI/TableCell";
import BorrowDrawerContainer from "containers/Borrow/DrawerBorrow";
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
const BorrowTable = ({ data = [], onActivate }) => {
    const classes = useStyles();
    return (
        <Box mt={1}>
            <Typography
                className={classes.heading}
                variant="h6"
                color="textPrimary"
            >
                Available Markets
            </Typography>
            <PerfectScrollbar>
                <Table className={classes.root}>
                    <TableBody>
                        {data.map((Row) => (
                            <TableRow key={Row.name} className={classes.row}>
                                <BorrowTableCell
                                    className={classes.startcell}
                                    component="th"
                                    scope="Row"
                                    style={{ width: "16%" }}
                                >
                                    <Box
                                        minWidth={150}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <img
                                            className={classes.imageSize}
                                            src={Row.image}
                                            alt="dai"
                                        />
                                        <Box ml={2}>
                                            <Typography
                                                variant="h6"
                                                color="textPrimary"
                                            >
                                                {Row.unit}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {Row.name}
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
                                        {formatNumber(Row.wallet, Row.unit)}
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
                                        {formatNumber(Row.balance, Row.unit)}
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
                                        {formatPercent(Row.apr)}
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
                                    align="right"
                                    className={classes.endcell}
                                >
                                    <Box
                                        minWidth={208}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <Box mr={2}></Box>
                                        {Row.activated ? (
                                            <BorrowDrawerContainer
                                                asset={Row}
                                            />
                                        ) : (
                                            <Button
                                                type="button"
                                                className={
                                                    classes.btnActiveOutline
                                                }
                                                variant="outlined"
                                                color="secondary"
                                                disable={Row.pending.toString()}
                                                onClick={() =>
                                                    onActivate(Row.unit)
                                                }
                                            >
                                                {Row.pending ? (
                                                    <CircularProgress
                                                        size={20}
                                                        color="inherit"
                                                    />
                                                ) : (
                                                    "Activate"
                                                )}
                                            </Button>
                                        )}
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

// Documentation with PropTypes
BorrowTable.propTypes = {
    //onboard: PropTypes.object.isRequired
};

export default BorrowTable;
