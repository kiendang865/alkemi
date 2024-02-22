// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { formatPercent, formatMoney } from "utils/ui";
import Loading from "../Loading/Loading";
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
    contentCard: {
        borderBottom: `1px solid ${theme.palette.success.main}`,
    },
}));

function DepositBalance({ totalDeposit, currency, apr }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Total Deposits" className={classes.item} />

            <Divider />
            <CardContent className={classes.contentCard}>
                {isLoading ? (
                    <Loading row={1} height={50} />
                ) : (
                    <Box
                        className={classes.item}
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Grid
                            alignItems="center"
                            container
                            justify="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    align="left"
                                >
                                    Total USD
                                </Typography>
                                <Typography
                                    variant="h3"
                                    color="textPrimary"
                                    align="left"
                                >
                                    {formatMoney(totalDeposit, currency)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    align="right"
                                >
                                    Earning APR
                                </Typography>
                                <Typography
                                    variant="h3"
                                    color="textPrimary"
                                    align="right"
                                >
                                    {formatPercent(apr)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
DepositBalance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default DepositBalance;
