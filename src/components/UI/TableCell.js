// Section 1: React low level imports

// Section 2: Material-UI imports
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    head: {
        fontSize: 12,
        color: theme.palette.text.secondary,
        opacity: "1",
        lineHeight: "1px",
        letterSpacing: 0,
        borderBottom: "1px solid #000000",
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
        borderBottom: "1px solid #000000",
    },
});

export default withStyles(styles)(TableCell);
