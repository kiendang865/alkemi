import React from "react";
import "antd/dist/antd.css";
import "./liquidate.scss";
import Web3 from "web3";
import { Button, Input, Pagination } from "antd";

// add i18n.
import { IntlProvider, FormattedMessage } from "react-intl";
import en_US from "../../language/en_US.js";
import zh_CN from "../../language/zh_CN";

// utilities
import {
    get_balance,
    get_allowance,
    get_list_data,
    format_Shortfall,
    handle_list_click,
    input_chang,
    click_liquidate,
    click_max,
    format_bn,
    handle_approve,
    to_ethscan_with_account,
    i_want_received_token,
    i_want_send_token,
    change_page,
    get_main_data_timer,
    format_num_K,
    get_history,
    change_page_history,
    open_it_onetherscan,
} from "utils/drizzle";

// images
import logo from "../../assets/images/logo.svg";
import logo_d from "../../assets/images/logo-d.png";
import telegram from "../../assets/images/telegram.svg";
import twitter from "../../assets/images/twitter.svg";
import lock from "../../assets/images/lock.svg";
import medium from "../../assets/images/medium.svg";
import wrong from "../../assets/images/wrong.svg";
import up from "../../assets/images/up.svg";
import down from "../../assets/images/down.svg";
import back from "../../assets/images/back.svg";

// constants
let mMarket_abi = require("../../ABIs/moneyMarket.json");
let WETH_abi = require("../../ABIs/WETH_ABI.json");
let USDx_abi = require("../../ABIs/USDX_ABI.json");
let USDT_abi = require("../../ABIs/USDT_ABI.json");
let Liquidate_ABI = require("../../ABIs/Liquidate_ABI.json");
let imBTC_ABI = require("../../ABIs/imBTC_ABI.json");
let DSR_ABI = require("../../ABIs/dsr.json");
let address = require("../../ABIs/address_map.json");

export default class Liquidate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    key: 0,
                    shortfallWeth: "0.00",
                    address: "...",
                    Supply: "0.00",
                    Borrow: "0.00",
                    collateralRate: "0.00%",
                },
            ],
            index: 0,
            amount_to_liquidate: "",
            data_is_ok: false,
            is_btn_enable: true,
            pageNumber: 1,
            pageSize: 15,
            cur_language: navigator.language === "zh-CN" ? "中文" : "English",
        };

        this.new_web3 = window.new_web3 = new Web3(Web3.givenProvider || null);
        this.bn = this.new_web3.utils.toBN;

        this.new_web3.eth.net.getNetworkType().then((net_type) => {
            let mMarket = new this.new_web3.eth.Contract(
                mMarket_abi,
                address[net_type]["mMarket"]
            );
            let WETH = new this.new_web3.eth.Contract(
                WETH_abi,
                address[net_type]["WETH"]
            );
            let USDx = new this.new_web3.eth.Contract(
                USDx_abi,
                address[net_type]["USDx"]
            );
            let USDT = new this.new_web3.eth.Contract(
                USDT_abi,
                address[net_type]["USDT"]
            );
            let imBTC = new this.new_web3.eth.Contract(
                imBTC_ABI,
                address[net_type]["imBTC"]
            );
            let HBTC = new this.new_web3.eth.Contract(
                imBTC_ABI,
                address[net_type]["HBTC"]
            );
            let Liquidate = new this.new_web3.eth.Contract(
                Liquidate_ABI,
                address[net_type]["liquidator"]
            );

            let USDC = new this.new_web3.eth.Contract(
                USDT_abi,
                address[net_type]["USDC"]
            );
            let PAX = new this.new_web3.eth.Contract(
                USDT_abi,
                address[net_type]["PAX"]
            );
            let TUSD = new this.new_web3.eth.Contract(
                USDT_abi,
                address[net_type]["TUSD"]
            );
            let WBTC = new this.new_web3.eth.Contract(
                USDT_abi,
                address[net_type]["WBTC"]
            );
            let DSR = new this.new_web3.eth.Contract(
                DSR_ABI,
                address[net_type]["DSR"]
            );

            this.new_web3.givenProvider.enable().then((res_accounts) => {
                this.setState(
                    {
                        net_type: net_type,
                        mMarket: mMarket,
                        WETH: WETH,
                        USDx: USDx,
                        USDT: USDT,
                        imBTC: imBTC,
                        HBTC: HBTC,
                        Liquidate: Liquidate,
                        my_account: res_accounts[0],
                        i_am_ready: true,
                        USDC: USDC,
                        PAX: PAX,
                        TUSD: TUSD,
                        WBTC: WBTC,
                        DSR: DSR,
                    },
                    () => {
                        get_allowance(
                            this,
                            address[this.state.net_type]["liquidator"]
                        );
                        get_list_data(this, 1);
                        get_balance(this);
                    }
                );
            });
        });

        // add accounts changed
        if (window.ethereum.on) {
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log("accountsChanged: ", accounts[0]);
                this.setState(
                    {
                        my_account: accounts[0],
                    },
                    () => {
                        console.log("connected: ", this.state.my_account);
                        if (this.state.net_type) {
                            get_allowance(
                                this,
                                address[this.state.net_type]["liquidator"]
                            );
                            get_list_data(this, 1);
                            get_balance(this);
                        }
                    }
                );
            });
        }

        this.update_list_timer = setInterval(() => {
            if (this.state.page_changeing || !this.state.i_am_ready) {
                console.log("u r changeing page.");
                return false;
            } else {
                get_main_data_timer(this);
                get_balance(this);
            }
        }, 1000 * 15);
    }

    clickFAQ = () => {
        // console.log('aaaaa');
        if (this.state.cur_language === "中文") {
            window.open("https://docs.alkemi.network/faqcn", "_blank");
        } else {
            window.open("https://docs.alkemi.network/faq", "_blank");
        }
    };

    contrl_show_history = () => {
        this.setState({ show_history: !this.state.show_history }, () => {
            if (this.state.show_history) {
                get_history(this);
                this.history_timer = setInterval(() => {
                    get_history(this);
                }, 1000 * 15);
            } else {
                clearInterval(this.history_timer);
            }
        });
    };

    click_connect = () => {
        this.new_web3.givenProvider.enable().then((res_accounts) => {
            this.setState({ my_account: res_accounts[0] }, () => {
                get_balance(this);
                get_allowance(this, address[this.state.net_type]["liquidator"]);
            });
        });
    };

    render() {
        return (
            <IntlProvider
                locale={"en"}
                messages={this.state.cur_language === "中文" ? zh_CN : en_US}
            >
                <React.Fragment>
                    <div className="top">
                        <div className="top-left">
                            <a
                                href="https://www.alkemi.network/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={logo} alt="" />
                            </a>
                        </div>
                        <div className="top-right">
                            {!this.state.my_account && (
                                <div className="top-right-btn">
                                    <FormattedMessage id="Connect" />
                                </div>
                            )}
                            {this.state.net_type &&
                                this.state.net_type !== "main" && (
                                    <div className="Wrong">
                                        <span className={"wrong-wrap"}>
                                            <img src={wrong} alt="" />
                                        </span>
                                        <span className="net-name net-name-wrong">
                                            {"Wrong Network"}
                                        </span>
                                    </div>
                                )}
                            {this.state.my_account &&
                                this.state.net_type === "main" && (
                                    <div className="top-right-account">
                                        <div
                                            className="account"
                                            onClick={() => {
                                                to_ethscan_with_account(
                                                    this,
                                                    this.state.my_account
                                                );
                                            }}
                                        >
                                            <span
                                                className={
                                                    "spot " +
                                                    this.state.net_type
                                                }
                                            ></span>
                                            <span className={"account-address"}>
                                                {this.state.my_account.slice(
                                                    0,
                                                    4
                                                ) +
                                                    "..." +
                                                    this.state.my_account.slice(
                                                        -4
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                )}

                            {/* <div className='Platform'>
                                <span className='Platform-title'>dForce Platform</span>
                                <span className='Platform-img'><img src={down} alt='' /></span>
                            </div> */}
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div className="main-body">
                        <h3
                            onClick={() => {
                                this.contrl_show_history();
                            }}
                            className="h3-switch"
                        >
                            <img src={back} />
                            <span>
                                {!this.state.show_history
                                    ? "History"
                                    : "Liquidation"}
                            </span>
                        </h3>

                        <div className="main-body-left">
                            {this.state.show_history && (
                                <>
                                    <div className="main-body-list main-body-list-history">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <FormattedMessage id="TX_Hash" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Target_Account" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Target_Asset" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Repay_Amount" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Liquidated_Asset" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Liquidated_Amount" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.history &&
                                                    this.state.history.map(
                                                        (item) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        item.transactionHash
                                                                    }
                                                                >
                                                                    <td
                                                                        onClick={() => {
                                                                            open_it_onetherscan(
                                                                                this,
                                                                                item.transactionHash
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item.transactionHash.slice(
                                                                            0,
                                                                            4
                                                                        ) +
                                                                            "..." +
                                                                            item.transactionHash.slice(
                                                                                -4
                                                                            )}
                                                                    </td>
                                                                    <td>
                                                                        {item.targetAccount.slice(
                                                                            0,
                                                                            4
                                                                        ) +
                                                                            "..." +
                                                                            item.targetAccount.slice(
                                                                                -4
                                                                            )}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item
                                                                                .assetBorrow
                                                                                .symbol
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {format_Shortfall(
                                                                            item
                                                                                .assetBorrow
                                                                                .amountRepaid
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item
                                                                                .assetCollateral
                                                                                .symbol
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {format_Shortfall(
                                                                            item
                                                                                .assetCollateral
                                                                                .amountSeized
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="page">
                                        <Pagination
                                            showQuickJumper
                                            pageSize={this.state.pageSize}
                                            defaultCurrent={
                                                this.state.pageNumber_history
                                            }
                                            total={
                                                this.state.totalSize_history
                                                    ? this.state
                                                          .totalSize_history
                                                    : 0
                                            }
                                            onChange={(page, pageSize) => {
                                                change_page_history(
                                                    this,
                                                    page,
                                                    pageSize
                                                );
                                            }}
                                        />
                                    </div>
                                </>
                            )}

                            {!this.state.show_history && (
                                <>
                                    <div className="main-body-list">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <FormattedMessage id="Shortfall" />{" "}
                                                        (WETH)
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Account" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Supply_Balance" />
                                                        ($)
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Borrow_Balance" />
                                                        ($)
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Collateralization_ratio" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.map((item) => {
                                                    return (
                                                        <tr
                                                            key={item.key}
                                                            onClick={() => {
                                                                handle_list_click(
                                                                    this,
                                                                    item.key
                                                                );
                                                            }}
                                                            className={
                                                                this.state
                                                                    .index ===
                                                                item.key
                                                                    ? "active"
                                                                    : ""
                                                            }
                                                        >
                                                            <td>
                                                                {format_num_K(
                                                                    format_Shortfall(
                                                                        item.shortfallWeth
                                                                    )
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item.address.slice(
                                                                    0,
                                                                    4
                                                                ) +
                                                                    "..." +
                                                                    item.address.slice(
                                                                        -4
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {format_num_K(
                                                                    item.Supply
                                                                )}
                                                            </td>
                                                            <td>
                                                                {format_num_K(
                                                                    item.Borrow
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.collateralRate
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="page">
                                        <Pagination
                                            showQuickJumper
                                            pageSize={this.state.pageSize}
                                            defaultCurrent={
                                                this.state.pageNumber
                                            }
                                            total={
                                                this.state.totalSize
                                                    ? this.state.totalSize
                                                    : 0
                                            }
                                            onChange={(page, pageSize) => {
                                                change_page(
                                                    this,
                                                    page,
                                                    pageSize
                                                );
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="main-body-right">
                            <div className="main-body-balance">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="th-1">
                                                <FormattedMessage id="Asset" />
                                            </th>
                                            <th className="th-2">
                                                <FormattedMessage id="Balance" />
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="body-wrap">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="td-1">
                                                    {"ETH"}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_eth_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_eth_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"WETH"}
                                                    {!this.state
                                                        .weth_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .WETH,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "weth"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_weth_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_weth_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"USDx"}
                                                    {!this.state
                                                        .usdx_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .USDx,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "usdx"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_usdx_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_usdx_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"USDT"}
                                                    {!this.state
                                                        .usdt_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .USDT,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "usdt"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_usdt_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_usdt_balance,
                                                                  6,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"imBTC"}
                                                    {!this.state
                                                        .imbtc_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .imBTC,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "imbtc"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_imbtc_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_imbtc_balance,
                                                                  8,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"HBTC"}
                                                    {!this.state
                                                        .hbtc_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .HBTC,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "hbtc"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_hbtc_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_hbtc_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"USDC"}
                                                    {!this.state
                                                        .usdc_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .USDC,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "usdc"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_usdc_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_usdc_balance,
                                                                  6,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"TUSD"}
                                                    {!this.state
                                                        .tusd_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .TUSD,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "tusd"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_tusd_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_tusd_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"PAX"}
                                                    {!this.state
                                                        .pax_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .PAX,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "pax"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_pax_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_pax_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"WBTC"}
                                                    {!this.state
                                                        .wbtc_approved && (
                                                        <img
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .WBTC,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "wbtc"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_wbtc_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_wbtc_balance,
                                                                  8,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-1">
                                                    {"DSR"}(
                                                    <a
                                                        className="chai"
                                                        href="https://chai.money"
                                                        target="_blank"
                                                    >
                                                        Chai
                                                    </a>
                                                    )
                                                    {!this.state
                                                        .dsr_approved && (
                                                        <img
                                                            className="chai"
                                                            alt=""
                                                            src={lock}
                                                            onClick={() => {
                                                                handle_approve(
                                                                    this,
                                                                    this.state
                                                                        .DSR,
                                                                    address[
                                                                        this
                                                                            .state
                                                                            .net_type
                                                                    ][
                                                                        "liquidator"
                                                                    ],
                                                                    "dsr"
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td className="td-2">
                                                    {this.state.my_dsr_balance
                                                        ? format_num_K(
                                                              format_bn(
                                                                  this.state
                                                                      .my_dsr_balance,
                                                                  18,
                                                                  2
                                                              )
                                                          )
                                                        : "0"}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {!this.state.show_history && (
                                <div className="main-body-details">
                                    <div className="account">
                                        <span className="account-title">
                                            <FormattedMessage id="Account" />:
                                        </span>
                                        <span
                                            className="account-address"
                                            onClick={() => {
                                                to_ethscan_with_account(
                                                    this,
                                                    this.state.data[
                                                        this.state.index
                                                    ].address
                                                );
                                            }}
                                        >
                                            {
                                                this.state.data[
                                                    this.state.index
                                                ].address
                                            }
                                        </span>
                                    </div>
                                    <div className="supply-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <FormattedMessage id="Supply" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Amount" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data[
                                                    this.state.index
                                                ].supply &&
                                                    this.state.data[
                                                        this.state.index
                                                    ].supply.map(
                                                        (supply_item) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        supply_item.asset
                                                                    }
                                                                    onClick={() => {
                                                                        i_want_received_token(
                                                                            this,
                                                                            supply_item
                                                                        );
                                                                    }}
                                                                    className={
                                                                        supply_item.symbol ===
                                                                        this
                                                                            .state
                                                                            .i_want_received
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <td>
                                                                        {
                                                                            supply_item.symbol
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {format_num_K(
                                                                            format_Shortfall(
                                                                                supply_item.amount
                                                                            )
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="borrow-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <FormattedMessage id="Borrow" />
                                                    </th>
                                                    <th>
                                                        <FormattedMessage id="Amount" />
                                                    </th>
                                                    <th className="escpecil">
                                                        <FormattedMessage id="MAX_Liquidation" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data[
                                                    this.state.index
                                                ].borrow &&
                                                    this.state.data[
                                                        this.state.index
                                                    ].borrow.map(
                                                        (borrow_item) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        borrow_item.asset
                                                                    }
                                                                    onClick={() => {
                                                                        i_want_send_token(
                                                                            this,
                                                                            borrow_item
                                                                        );
                                                                    }}
                                                                    className={
                                                                        borrow_item.symbol ===
                                                                        this
                                                                            .state
                                                                            .i_want_send
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <td>
                                                                        {
                                                                            borrow_item.symbol
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {format_num_K(
                                                                            format_Shortfall(
                                                                                borrow_item.amount
                                                                            )
                                                                        )}
                                                                    </td>
                                                                    <td className="escpecil">
                                                                        {borrow_item.symbol ===
                                                                            this
                                                                                .state
                                                                                .i_want_send &&
                                                                        this
                                                                            .state
                                                                            .max_liquidate_amount
                                                                            ? format_num_K(
                                                                                  format_Shortfall(
                                                                                      this
                                                                                          .state
                                                                                          .max_liquidate_amount_show
                                                                                  )
                                                                              )
                                                                            : ""}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="liquidate">
                                        <div className="liquidate-title">
                                            <span>
                                                <FormattedMessage id="RequestedAmountClose" />
                                            </span>
                                            <span style={{ color: "#00A577" }}>
                                                {this.state.i_want_send
                                                    ? " (" +
                                                      this.state.i_want_send +
                                                      ")"
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="liquidate-con">
                                            <div className="input-wrap">
                                                <Input
                                                    placeholder="number"
                                                    type="number"
                                                    onChange={(e) => {
                                                        input_chang(
                                                            this,
                                                            e.target.value
                                                        );
                                                    }}
                                                    value={
                                                        this.state
                                                            .amount_to_liquidate
                                                    }
                                                />
                                                <span
                                                    className="max-tips"
                                                    onClick={() => {
                                                        click_max(this);
                                                    }}
                                                >
                                                    MAX
                                                </span>
                                            </div>
                                            <div className="button-wrap">
                                                <Button
                                                    loading={this.state.loading}
                                                    onClick={() => {
                                                        click_liquidate(this);
                                                    }}
                                                    className={
                                                        !this.state
                                                            .is_btn_enable ||
                                                        this.state
                                                            .liquidator_btn_disabled ||
                                                        this.state.data[
                                                            this.state.index
                                                        ].address ===
                                                            this.state
                                                                .my_account
                                                            ? "disable-button"
                                                            : null
                                                    }
                                                    disabled={
                                                        this.state
                                                            .liquidator_btn_disabled ||
                                                        this.state.data[
                                                            this.state.index
                                                        ].address ===
                                                            this.state
                                                                .my_account
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {this.state.loading ? (
                                                        <FormattedMessage id="SUBMITTING" />
                                                    ) : (
                                                        <FormattedMessage id="LIQUIDATE" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="clear"></div>
                    </div>
                </React.Fragment>
            </IntlProvider>
        );
    }
}
