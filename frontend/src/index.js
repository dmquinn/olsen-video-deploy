import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import store from "./store";
import App from "./App";
import { Provider } from "react-redux";

import thunk from "redux-thunk";

const middleware = [thunk];

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
