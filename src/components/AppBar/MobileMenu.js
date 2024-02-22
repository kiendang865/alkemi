// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    SvgIcon,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { XCircle as XIcon, Menu as MenuIcon } from "react-feather";

// Section 3: Components & Containers import from the application
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarHeader from "containers/Sidebar/Header";

// Section 4: Define Styles function taking theme as argument and returning an object
const DrawerClass = makeStyles((theme) =>
    createStyles({
        drawer: {
            width: "100%",
            "@media (min-width: 780px)": {
                width: 380,
            },
        },
    })
);

// Section 5: Code Component
export default function MobileMenu() {
    const classes = DrawerClass();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleOpen}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                classes={{ paper: classes.drawer }}
                ModalProps={{ BackdropProps: { invisible: false } }}
                onClose={handleClose}
                open={isOpen}
                variant="temporary"
                transitionDuration={0}
            >
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                    >
                        <SidebarHeader />
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="small">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box pt={1}>
                        <List onClick={handleClose}>
                            <SidebarDashboardItem />
                            <SidebarLendItem />
                            <SidebarBorrowItem />
                            <SidebarMarketsItem />
                            <SidebarHistoryItem />
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
