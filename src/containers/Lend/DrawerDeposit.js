import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onDepositAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, toWei, formatETHMoney } from "utils/ui";

import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";

const DepositDrawerContainer = ({ asset, drizzle, onDepositAction }) => {
    useFetchPrice(true); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableDeposit, setEnableDeposit] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.wallet));
            setEnableDeposit(isAmountLTBalance);
        }
    }, [amount, asset.wallet, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Deposit"
            triggerButtonVariant="contained"
            enableButtonClick={enableDeposit}
            onButtonClick={() => onDepositAction({ drizzle, asset, amount })}
            isDoingAction={asset.depositing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Deposit ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onDepositAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DepositDrawerContainer);
