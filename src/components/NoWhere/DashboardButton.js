import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    button: {
        margin: theme.spacing(3),
    },
});

const NoWhereDashboardButton = ({ classes, onClick }) => (
    <Button
        variant="raised"
        color="default"
        className={classes.button}
        onClick={onClick}
    >
        Bring me back home!
    </Button>
);

NoWhereDashboardButton.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NoWhereDashboardButton);
