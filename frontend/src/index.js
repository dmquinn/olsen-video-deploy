import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./App";
import { Provider } from "react-redux";
import { playlistReducer } from "./reducers/playlistReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
	playlistReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
