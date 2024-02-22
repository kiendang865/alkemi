// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
// Section 2: Material-UI imports
import { TableCell } from "@material-ui/core";

// Section 5: Code Component
const Loading = ({ colSpan = 1, height = 10, row = 1 }) => {
    var indents = [];
    for (var i = 0; i < row; i++) {
        indents.push(
            <Skeleton
                key={i}
                style={{ height: height, marginTop: 0 }}
                animation="wave"
            />
        );
    }
    return (
        <TableCell style={{ borderBottom: 0 }} colSpan={colSpan}>
            {indents}
        </TableCell>
    );
};

// Section 6: Documentation with PropTypes
Loading.propTypes = {
    colSpan: PropTypes.number,
    height: PropTypes.number,
    row: PropTypes.number,
};

// Section 7:  Connect styles and export
export default Loading;
