// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowTable from "./Table";
import BorrowTableActive from "./TableActive";
import BorrowCard from "components/UI/DefaultCard";
import BorrowCardLimit from "containers/Borrow/CardLimit";
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
function Borrow({ className, activeBorrow, inactiveBorrow, onActivate, totalBorrow, currency, totalAPR }) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
             <BorrowCard
                title="Total Borrowed"
                cardContent= {formatMoney(totalBorrow, currency)}
                />
            </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <BorrowCardLimit />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                <BorrowCard
                   title="Loan APR%"
                   cardContent= {formatPercent(totalAPR)}
                   />
                </Grid>
                {!!activeBorrow.length && (
                    <Grid item lg={12} xs={12}>
                        <BorrowTableActive data={activeBorrow} />
                    </Grid>

                )}
                {!!inactiveBorrow.length && (
                    <Grid item lg={12} xs={12}>
                        <BorrowTable
                            data={inactiveBorrow}
                            onActivate={onActivate}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
Borrow.propTypes = {
    className: PropTypes.string,
    activeBorrow: PropTypes.array.isRequired,
    inactiveBorrow: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default Borrow;
