// Main component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    makeStyles,
} from "@material-ui/core";
import Loading from "../Loading/Loading";

// Section 3: Components & Containers import from the application
import Stats from "./CardStats";
import MarketsCard from "components/UI/DefaultCard";
import MarketsTable from "./TableMarkets";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 250,
        marginRight: 10,
    },
    heading: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

// Section 5: Code Component
const Markets = ({
    marketsData,
    supplyArray,
    borrowArray,
    totalBorrowedContent,
    collateralRatioContent,
    totalDepositsContent,
}) => {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketsCard
                        title="Total Deposits"
                        cardContent={totalDepositsContent}
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketsCard
                        title="Total Borrowed"
                        cardContent={totalBorrowedContent}
                    />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketsCard
                        title="Collateral Ratio"
                        cardContent={collateralRatioContent}
                    />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Deposits2" />
                        <Divider />
                        <CardContent>
                            <Box height="180px" overflow="auto" pr={3} pt={1}>
                                {!supplyArray.length && (
                                    <Loading row={3} height={50} />
                                )}
                                {supplyArray &&
                                    supplyArray.length > 0 &&
                                    supplyArray.map((supply_item) => {
                                        return (
                                            <Stats
                                                {...supply_item}
                                                key={supply_item.symbol}
                                                type={"supply"}
                                            />
                                        );
                                    })}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item lg={6} sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Borrowed" />
                        <Divider />
                        <CardContent>
                            <Box height="180px" overflow="auto" pr={3} pt={1}>
                                {!borrowArray.length && (
                                    <Loading row={3} height={50} />
                                )}
                                {borrowArray &&
                                    borrowArray.length > 0 &&
                                    borrowArray.map((borrow_item) => {
                                        return (
                                            <Stats
                                                {...borrow_item}
                                                key={borrow_item.symbol}
                                                type={"borrow"}
                                            />
                                        );
                                    })}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <MarketsTable marketsData={marketsData} />
                </Grid>
            </Grid>
        </Container>
    );
};

// Section 6: Documentation with PropTypes
Markets.propTypes = {
    supplyArray: PropTypes.array.isRequired,
    borrowArray: PropTypes.array.isRequired,
};

// Section 7:  Export
export default Markets;
