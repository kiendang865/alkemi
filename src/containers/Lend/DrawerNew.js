import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import withDrizzle from "containers/Drizzle/withDrizzle";
import DrawerNew from "components/UI/Drawer/DrawerNew";
import { onDepositAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, toWei, formatETHMoney } from "utils/ui";

import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";
const data = [
  {
    name: "Dai",
    image: "/images/DAI.svg",
    total: 234.53345,
    amount: 234.43,
    discount: "10%",
    debtToCover: 123.44,
    discountValue: 133.45,
    recieve: 123.34
  },
  {
    name: "Usdt",
    image: "/images/USDT.svg",
    total: 33.7554,
    amount: 234.43,
    discount: "5%",
    debtToCover: 456.44,
    discountValue: 223.45,
    recieve: 234.34
  },
  {
    name: "Usdc",
    image: "/static/media/USDC.ceb8339c.svg",
    total: 27.7575,
    amount: 234.43,
    discount: "10%",
    debtToCover: 123.44,
    discountValue: 137.88,
    recieve: 1265.10
  }
]
const DepositDrawerContainer = ({ asset, drizzle, onDepositAction }) => {

    return (
        <DrawerNew
          buttonsLabel="Deposit"
          data={data}
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
