import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addPlaylistItem, listPlaylist } from "./reducers/productReducers";

const reducer = combineReducers({
	playlistItem: addPlaylistItem,
	listPlaylist: listPlaylist,
});
const playlistFromStorage = localStorage.getItem("playlist")
	? JSON.parse(localStorage.getItem("playlist"))
	: null;
const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
