// Main Component

// Section 1: React low level imports
import React, { useState, useRef } from "react";

// Section 2: Material-UI imports
import {
    Box,
    FormControlLabel,
    IconButton,
    Popover,
    SvgIcon,
    Switch,
    TextField,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { Settings as SettingsIcon } from "react-feather";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    popover: {
        width: 320,
        padding: theme.spacing(2),
    },
}));

const language = [
    {
        id: "EN",
        name: "English",
    },
    {
        id: "PT",
        name: "Português",
    },
    {
        id: "FR",
        name: "Française",
    },
];

const currencies = [
    {
        id: "USD",
        name: "USD - US Dollars",
    },
    {
        id: "BRL",
        name: "BRL - Brazilian Rial",
    },
    {
        id: "EUR",
        name: "EUR - Euro",
    },
];

function Settings() {
    const classes = useStyles();
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field, value) => {
        setValues({
            ...values,
            [field]: value,
        });
    };

    // Section 5: Code Component
    return (
        <>
            <Tooltip title="Settings">
                <IconButton color="inherit" onClick={handleOpen} ref={ref}>
                    <SvgIcon fontSize="small">
                        <SettingsIcon />
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
                <Typography variant="h5" color="textPrimary">
                    Settings
                </Typography>
                <Box mt={2} px={1}>
                    <FormControlLabel
                        control={<Switch />}
                        label="Theme Toggle"
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label="Language"
                        name="language"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.category}
                        variant="outlined"
                        color="secondary"
                    >
                        {language.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </TextField>
                </Box>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label="Currency"
                        name="currency"
                        onChange={handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.category}
                        variant="outlined"
                        color="secondary"
                    >
                        {currencies.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Popover>
        </>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Settings;
