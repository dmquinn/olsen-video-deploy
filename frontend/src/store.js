import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	playlistAddReducer,
	listPlaylistReducer,
} from "./reducers/playlistReducer";

const reducer = combineReducers({
	playlistItem: playlistAddReducer,
	listPlaylists: listPlaylistReducer,
});
const playlistFromStorage = localStorage.getItem("playlist")
	? JSON.parse(localStorage.getItem("playlist"))
	: null;
// const initialState = {
// 	playlist: { playlistInfo: playlistFromStorage },
// };
const middleware = [thunk];

const store = createStore(
	// initialState,
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
