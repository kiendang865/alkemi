// Main Component

// Section 1: React low level imports
import React, { useState, useRef } from "react";

// Section 2: Material-UI imports
import {
    Box,
    IconButton,
    Popover,
    SvgIcon,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { Bell as BellIcon } from "react-feather";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    popover: {
        width: 320,
        padding: theme.spacing(2),
    },
}));

function Notifications() {
    const classes = useStyles();
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Section 5: Code Component
    return (
        <>
            <Tooltip title="Notications">
                <IconButton color="inherit" onClick={handleOpen} ref={ref}>
                    <SvgIcon>
                        <BellIcon />
                    </SvgIcon>
                </IconButton>
            </Tooltip>
            <Popover
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                classes={{ paper: classes.popover }}
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
            >
                <Typography variant="h6" color="textPrimary">
                    Notifications
                </Typography>
                <Box mt={2} px={1}>
                    Notifications here
                </Box>
            </Popover>
        </>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Notifications;
