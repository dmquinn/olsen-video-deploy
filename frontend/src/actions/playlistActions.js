import axios from "axios";
import {
	ADD_PLAYLIST_ITEM_REQUEST,
	ADD_PLAYLIST_ITEM_SUCCESS,
	ADD_PLAYLIST_ITEM_FAIL,
} from "../reducers/playlistReducer";

export const addPlaylistItem = (video) => async (dispatch) => {
	console.log("item", video);
	try {
		dispatch({
			type: ADD_PLAYLIST_ITEM_REQUEST,
		});

		// const config = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// };
		const { data } = await axios.post("http://localhost:5000/playlist/", {
			video,
		});
		console.log("data", data);

		dispatch({
			type: ADD_PLAYLIST_ITEM_SUCCESS,
			payload: data,
		});
		localStorage.setItem("playlistItem", JSON.stringify(data));
		console.log(localStorage);
	} catch (error) {
		dispatch({
			type: ADD_PLAYLIST_ITEM_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
