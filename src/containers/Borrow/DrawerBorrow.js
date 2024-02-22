// Section 1: React/Reduxd low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import { formatNumber, formatETHMoney } from "utils/ui";

// Section 3: Selectors, Hooks & Action Listeners
import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";
import { onBorrowAction } from "redux/actions/data/borrow";

// Section 4: Import Underlying Components / Containers
import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";

// Section 5: Code Container
const BorrowDrawerContainer = ({ asset, drizzle, onBorrowAction }) => {
    useFetchPrice(true); // gets current USD price

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => {
        setAmount(asset.maxBorrowToken.toString()); // retrieves Maximum Token Borrow Amount
        //  setAmount(asset.safeBorrowToken.toString()); // @Ben retrieves Safe Maximum Token Borrow Amount 80% of max
    };
    const [enableBorrow, setEnableBorrow] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // check that User Input Amount does not exceed maximum amount of tokens that user can borrow for asset and is not less than 0
            const isAmountLTmaxBorrow =
                amount <= asset.maxBorrowToken && amount > 0 ? true : false;
            setEnableBorrow(isAmountLTmaxBorrow);
        }
    }, [amount, asset.balance, asset.maxBorrowToken, asset.unit, asset.wallet]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Borrow"
            triggerButtonVariant="contained"
            enableButtonClick={enableBorrow}
            onButtonClick={() => onBorrowAction({ drizzle, asset, amount })}
            isDoingAction={asset.borrowing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Borrow ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
        />
    );
};
// Section 6: Dispatch & Props Mapping
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onBorrowAction }, dispatch);

// Section 7: Export Container
export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowDrawerContainer);
