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
    Typography,
    makeStyles,
} from "@material-ui/core";
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
        textAlign: "center",
        justifyContent: "center",
    },
}));

// Section 5: Code Component
const DepositCard = ({ title, cardContent }) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <Card>
            <CardHeader title={title} className={classes.item} />
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
                            {cardContent}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

// Section 6: Documentation with PropTypes
DepositCard.propTypes = {
    title: PropTypes.string.isRequired,
    cardContent: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default DepositCard;
