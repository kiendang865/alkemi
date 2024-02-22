import React from "react";
// import PropTypes from "prop-types";
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from "@material-ui/core";

const liquidateList = [
    {
        shortfallWeth: "john doe",
        address: "18 january, 2019",
        Supply: 1000,
        Borrow: "close",
        collateralRate: "ABC Fintech LTD.",
    },
    {
        shortfallWeth: "kessy bryan",
        address: "10 january, 2019",
        Supply: 9000,
        Borrow: "open",
        collateralRate: "My Fintech LTD.",
    },
    {
        shortfallWeth: "kessy bryan",
        address: "10 january, 2019",
        Supply: 9000,
        Borrow: "open",
        collateralRate: "My Fintech LTD.",
    },
    {
        shortfallWeth: "james cassegne",
        address: "8 january, 2019",
        Supply: 5000,
        Borrow: "close",
        collateralRate: "Collboy Tech LTD.",
    },
    {
        shortfallWeth: "lucy brown",
        address: "1 january, 2019",
        Supply: 89000,
        Borrow: "open",
        collateralRate: "ABC Fintech LTD.",
    },
    {
        shortfallWeth: "lucy brown",
        address: "1 january, 2019",
        Supply: 89000,
        Borrow: "open",
        collateralRate: "ABC Fintech LTD.",
    },
    {
        shortfallWeth: "lucy brown",
        address: "1 january, 2019",
        Supply: 89000,
        Borrow: "open",
        collateralRate: "ABC Fintech LTD.",
    },
    {
        shortfallWeth: "lucy brown",
        address: "1 january, 2019",
        Supply: 89000,
        Borrow: "open",
        collateralRate: "ABC Fintech LTD.",
    },
    {
        shortfallWeth: "lucy brown",
        address: "1 january, 2019",
        Supply: 89000,
        Borrow: "open",
        collateralRate: "ABC Fintech LTD.",
    },
];

const Liquidate = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Deficit (ETH)</TableCell>
                        <TableCell className="px-0">Account</TableCell>
                        <TableCell className="px-0">
                            Supply Balance($)
                        </TableCell>
                        <TableCell className="px-0">
                            Borrow Balance($)
                        </TableCell>
                        <TableCell className="px-0">
                            Collateralization Ratio
                        </TableCell>
                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {liquidateList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {item.shortfallWeth}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {item.address}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {item.Supply}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {item.Borrow}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    ${item.collateralRate}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={liquidateList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

// Liquidate.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default Liquidate;
