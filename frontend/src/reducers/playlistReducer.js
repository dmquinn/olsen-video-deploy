// const initialState = { playlistItem: [] };

export const ADD_PLAYLIST_ITEM_REQUEST = "ADD_PLAYLIST_ITEM_REQUEST";
export const ADD_PLAYLIST_ITEM_SUCCESS = "ADD_PLAYLIST_ITEM_SUCCESS";
export const ADD_PLAYLIST_ITEM_FAIL = "ADD_PLAYLIST_ITEM_FAIL";

const playlistReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_PLAYLIST_ITEM_REQUEST:
			return { loading: true };
		case ADD_PLAYLIST_ITEM_SUCCESS:
			return { loading: false, playlistItem: action.payload };
		case ADD_PLAYLIST_ITEM_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
export default playlistReducer;
