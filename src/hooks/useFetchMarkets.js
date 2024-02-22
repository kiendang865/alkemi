import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import _ from "lodash";

import { compare_supply, compare_borrow } from "utils/markets";

const url_map = require("constants/url_map.json");

// Retrieve the USD price every 15 seconds
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const [marketsData, setMarketsData] = useState([]);

    const [supplyArray, setSupplyArray] = useState([]);
    const [borrowArray, setBorrowArray] = useState([]);

    const [calculationsTotals, setCalculationsTotals] = useState({});

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_markets_data = () => {
            const markets_api = url_map["rinkeby"].markets_url; // TODO: update with automatic network selection when other networks than rinkeby are available

            fetch(markets_api)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);

                        let key_markets = Object.keys(obj_data);

                        const arr_markets = key_markets.map((e) => {
                            return obj_data[e];
                        });

                        let totalSupplyBalanceUSD = 0;
                        let totalBorrowBalanceUSD = 0;

                        const arr_items = arr_markets.map((market) => {
                            let key_items = Object.values(market);

                            let asset = key_items[0];

                            totalSupplyBalanceUSD += parseFloat(
                                asset.totalSupplyUSD
                            );
                            totalBorrowBalanceUSD += parseFloat(
                                asset.totalBorrowUSD
                            );

                            return asset;
                        });

                        let totalCollateralRatio =
                            (totalSupplyBalanceUSD / totalBorrowBalanceUSD) *
                            100;

                        let totals = {};

                        totals.totalSupplyBalanceUSD = totalSupplyBalanceUSD.toFixed(
                            2
                        );
                        totals.totalBorrowBalanceUSD = totalBorrowBalanceUSD.toFixed(
                            2
                        );
                        totals.totalCollateralRatio = totalCollateralRatio.toFixed(
                            2
                        );

                        setMarketsData(arr_items);

                        let supply_array = _.cloneDeep(arr_items);
                        let borrow_array = _.cloneDeep(arr_items);

                        supply_array.sort(compare_supply);
                        borrow_array.sort(compare_borrow);

                        supply_array = supply_array.map((e) => {
                            e.percentage_supply = Number(
                                (e.totalSupplyUSD /
                                    totals.totalSupplyBalanceUSD) *
                                    100
                            ).toFixed(1);

                            return e;
                        });

                        borrow_array = borrow_array.map((e) => {
                            e.percentage_borrow = Number(
                                (e.totalBorrowUSD /
                                    totals.totalBorrowBalanceUSD) *
                                    100
                            ).toFixed(1);

                            return e;
                        });

                        setSupplyArray(supply_array);
                        setBorrowArray(borrow_array);
                        setCalculationsTotals(totals);
                    }
                });
        };

        const getMarketsData = () => {
            get_markets_data();

            if (fetchPeriodically === true) {
                timer = setTimeout(getMarketsData, 15 * 1000);
            }
        };

        getMarketsData();

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dispatch, fetchPeriodically]);

    return { marketsData, supplyArray, borrowArray, calculationsTotals };
};
