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
    LinearProgress,
    Typography,
    makeStyles,
} from "@material-ui/core";
import Loading from "../Loading/Loading";
// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    item: {
        textAlign: "center",
        justifyContent: "center",
    },
    progress: {
        margin: theme.spacing(0, 1, 0, 3),
        flexGrow: 1,
        background: "#414244",
    },
}));

function BorrowLimit({ borrowLimit }) {
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
            <CardHeader title="Borrow Limit" className={classes.item} />
            <Divider />
            <CardContent>
                {isLoading ? (
                    <Loading row={1} height={50} />
                ) : (
                    <Box
                        className={classes.item}
                        mt={2}
                        mb={1}
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography variant="h3" color="textPrimary">
                            {borrowLimit.toFixed(2)}%
                        </Typography>
                        <LinearProgress
                            className={classes.progress}
                            value={borrowLimit}
                            color="secondary"
                            variant="determinate"
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
BorrowLimit.propTypes = {
    className: PropTypes.string,
    borrowLimit: PropTypes.number,
};

// Section 7:  Connect styles and export
export default BorrowLimit;
