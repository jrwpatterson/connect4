import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import {configureStore} from "./store";
import { Router, Route, withRouter, browserHistory } from "react-router";
import { Provider,  } from "react-redux";
import {urlChange}from "./actions/game"
import Index from "views";

import App from "./App";

const rootElement = document.getElementById("main");

const store = configureStore();
if ((module as any).hot) {
    (module as any).hot.accept("./App", () => {
        const NextApp = require("./App").default;
        ReactDOM.render(<AppContainer><NextApp /></AppContainer>, rootElement);
    });
}

browserHistory.listen(
    ()=>{
        store.dispatch(urlChange())}
)


ReactDOM.render(
    <AppContainer>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:gameBoard/:turn(/:winner))"  component={App}></Route>
    </Router>
  </Provider></AppContainer>,
  document.getElementById("main")
)
;

