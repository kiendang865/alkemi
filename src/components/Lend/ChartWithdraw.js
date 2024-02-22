import * as React from "react";
import { Chart, LineSeries } from "@devexpress/dx-react-chart-material-ui";

const generateData = (start, end, step) => {
    const data = [];
    for (let i = start; i < end; i += step) {
        data.push({
            lineValue: (i / 15) ** 2.718 - 0.2,
            argument: i,
        });
    }

    return data;
};

export default class WithdrawChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: generateData(2.5, 1000, 33),
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Chart
                height={81}
                width={455}
                style={{
                    padding: 0,
                }}
                data={chartData}
            >
                <LineSeries
                    valueField="lineValue"
                    argumentField="argument"
                    color="#FFFFFF"
                />
            </Chart>
        );
    }
}
