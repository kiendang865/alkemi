// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTable from "./Table";
import LendTableActive from "./TableActive";
import DepositCard from "components/UI/DefaultCard";
import { formatMoney, formatPercent } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

// Section 5: Code Component
function Lend({ className, activeLend, inactiveLend, onActivate, USDPrice,totalDeposit,currency,totalAPR }) {
    const classes = useStyles();
    const data = {
        value: (0.0).toFixed(2),
        currency: "$",
        difference: 0,
    };
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                 <DepositCard
                            title="Total Deposited"
                            cardContent= {formatMoney(totalDeposit, currency)}
                         />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                <DepositCard
                           title="Earning APR%"
                           cardContent= {data.value}
                        />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                <DepositCard
                           title="Earning APR%"
                           cardContent= {formatPercent(totalAPR)}
                        />
                </Grid>
                {!!activeLend.length && (
                    <Grid item lg={12} xs={12}>
                        <LendTableActive
                            data={activeLend}
                            USDPrice={USDPrice}
                        />
                    </Grid>
                )}
                {!!inactiveLend.length && (
                    <Grid item lg={12} xs={12}>
                        <LendTable
                            data={inactiveLend}
                            onActivate={onActivate}
                        />
                    </Grid>
                )}{" "}
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
Lend.propTypes = {
    className: PropTypes.string,
    activeLend: PropTypes.array.isRequired,
    inactiveLend: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default Lend;
