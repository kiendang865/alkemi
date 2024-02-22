// Sub Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
  Box,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

// Section 3: Components & Containers import from the application
import USDT from "assets/images/USDT.svg";
import WETH from "assets/images/WETH.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
// png
import PAX from "assets/images/pax.png";



// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = theme => ({
  root: {
      padding: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
  },
  label: {
      marginLeft: theme.spacing(1),
  },
  item: {
      textAlign: "center",
      justifyContent: "center",
  },
  progressDeposits: {
      flexGrow: 1,
      height: 8,
      borderRadius: 5,
      background: "rgb(255 254 254 / 10%)",

  },
  progressBorrows: {
      flexGrow: 1,
      height: 8,
      borderRadius: 5,
      background: "rgb(255 254 254 / 10%)",

  },
  assetIcon: {
    width: 22,
  },
assetName: {
  marginLeft: theme.spacing(1),
}
});


class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: {
                WETH: WETH,
                USDT: USDT,
                USDC: USDC,
                PAX: PAX,
                WBTC: WBTC,
                DAI: DAI,
            },
        };
    }

// Section 5: Code Component
    render() {
      const { classes } = this.props;
        return (
            <>
            <Box pb={1}
                    display="flex">
                    <img
                        className={classes.assetIcon}
                        src={this.state.token[this.props.symbol]}
                        alt={this.props.name}
                    />
                    <Typography
                        className={classes.assetName}
                        variant="h6"
                        color="textPrimary"
                    >{this.props.symbol}
                    </Typography>
                    <Box flexGrow={1} >
                    <Typography
                        variant="h6"
                        color="textPrimary"
                        align="right"
                    >
                        {this.props.type === "supply"
                            ? this.props.percentage_supply
                            : this.props.percentage_borrow}
                        %
                    </Typography>
                    </Box>
                    </Box>
                    <Box pb={3}>
                    {this.props.type === "supply" ? (
                  <LinearProgress
                           className={classes.progressDeposits}
                           value={Number(this.props.percentage_supply)}
                           color="primary"
                           variant="determinate"
                    />

                    ) : (
                      <LinearProgress
                               className={classes.progressBorrows}
                               value={Number(this.props.percentage_borrow)}
                               color="secondary"
                               variant="determinate"
                        />
                    )}
                </Box>
            </>
        );
    }
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default withStyles(useStyles)(Stats);
