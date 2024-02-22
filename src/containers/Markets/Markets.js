// Section 1: React/Redux low level imports
import React from "react";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

import { format_str_to_kmb } from "utils/markets";

// Section 3: Selectors

// Section 4: Container body
const MarketsContainer = () => {
    const {
        marketsData,
        supplyArray,
        borrowArray,
        calculationsTotals,
    } = useFetchMarkets(true); // optimize useFetchMarkets (with a throttled call in redux action) if it's used from more than one place

    const totalBorrowedContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalBorrowBalanceUSD.toString()
              )
            : 0
    }`;

    const collateralRatioContent = `${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? calculationsTotals.totalCollateralRatio
            : 0
    }%`;

    const totalDepositsContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalSupplyBalanceUSD.toString()
              )
            : 0
    }`;

    return (
        <Markets
            marketsData={marketsData}
            supplyArray={supplyArray}
            borrowArray={borrowArray}
            totalBorrowedContent={totalBorrowedContent}
            collateralRatioContent={collateralRatioContent}
            totalDepositsContent={totalDepositsContent}
        />
    );
};

// Section 5: Exports
export default MarketsContainer;
