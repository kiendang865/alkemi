import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import { formatNumber, fromWei, toWei, formatETHMoney } from "utils/ui";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onRepayAction } from "redux/actions/data/borrow";

import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";

const DrawerRepayContainer = ({ asset, drizzle, onRepayAction }) => {
    useFetchPrice(true); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableRepay, setEnableRepay] = React.useState(false);
    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableRepay(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Repay"
            triggerButtonVariant="outlined"
            triggerButtonColor="secondary"
            enableButtonClick={enableRepay}
            onButtonClick={() => onRepayAction({ drizzle, asset, amount })}
            isDoingAction={asset.repaying}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Repay ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Borrowed: ${formatNumber(asset.balance, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onRepayAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerRepayContainer);
