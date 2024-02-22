import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { networkSelector } from "redux/selectors/drizzle";

import { fetchPrice } from "redux/actions/data/price";

// Retrieve the USD price every 15 seconds
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(networkSelector);

    useEffect(() => {
        let timer;

        const getPrice = () => {
            dispatch(fetchPrice({ currentNetworkName, unit: "USDC" }));

            if (fetchPeriodically === true) {
                timer = setTimeout(getPrice, 15 * 1000);
            }
        };

        if (currentNetworkName !== undefined) {
            getPrice();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentNetworkName, dispatch, fetchPeriodically]);
};
