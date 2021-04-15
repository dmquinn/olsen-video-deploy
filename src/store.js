import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { musicListReducer } from "./reducers/listReducers";

const reducer = combineReducers({
	musicList: musicListReducer,
});
const store = createStore(reducer);

export default store;
