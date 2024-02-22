// Main Component

// Section 1: React low level imports
import React, { useState } from "react";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import DashCardValue from "containers/Dashboard/CardValue";
import DashCardDeposit from "containers/Dashboard/CardDeposit";
import DashCardBorrow from "containers/Dashboard/CardBorrow";
import TableDeposit from "containers/Dashboard/TableDeposit";
import TableBorrow from "containers/Dashboard/TableBorrow";

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

const tabs = [
    { value: "tabledeposit", label: "Active Deposits" },
    { value: "tableborrow", label: "Active Borrowed" },
];

function Dashboard() {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState("tabledeposit");
    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

    // Section 5: Code Component
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardValue />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardDeposit />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardBorrow />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <Box>
                        <Box mt={2}>
                            <Tabs
                                onChange={handleTabsChange}
                                scrollButtons="auto"
                                value={currentTab}
                                textColor="secondary"
                                variant="scrollable"
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Divider />
                        <Box py={3} pb={6}>
                            {currentTab === "tabledeposit" && <TableDeposit />}
                            {currentTab === "tableborrow" && <TableBorrow />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Dashboard;
