import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addPlaylistItem } from "./reducers/productReducers";

const reducer = combineReducers({ playlistItem: addPlaylistItem });

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
