import React, { Component } from "react";
import ReactDOM from "react-dom";

// store provider set up
import { Provider } from "react-redux";
import store from "containers/Drizzle/drizzleStore.js";

import { ConnectedRouter } from "connected-react-router";
import { hot } from "react-hot-loader/root";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "react-perfect-scrollbar/dist/css/styles.css";
import "assets/scss/style.scss";
import theme from "themes/theme";
import Layout from "containers/Layout/Layout";
import { history } from "redux/enhancers/middlewares/router";
import Drizzle from "containers/Drizzle/Drizzle";

import registerServiceWorker from "./utils/registerServiceWorker";

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Drizzle>
                    <ConnectedRouter history={history}>
                        <MuiThemeProvider theme={theme}>
                            <CssBaseline />
                            <Layout />
                        </MuiThemeProvider>
                    </ConnectedRouter>
                </Drizzle>
            </Provider>
        );
    }
}

const AppWithHotReload = hot(App);

ReactDOM.render(
    <AppWithHotReload />,
    document.getElementById("root") || document.createElement("div")
);
registerServiceWorker();
