import React from "react";
import { connect } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import maTheme from "./theme";
import Routes from "./routes/Routes";

/**
 * 
 * Main application, wraps in the Material UI themes provider and then 
 * serves the Router to each page
 */
function App({ theme }) {
  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
          <ThemeProvider theme={maTheme[theme.currentTheme]}>
            <Routes />
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  );
}

export default connect(store => ({ theme: store.themeReducer }))(App);
