// const initialState = { playlistItem: [] };

export const ADD_PLAYLIST_ITEM_REQUEST = "ADD_PLAYLIST_ITEM_REQUEST";
export const ADD_PLAYLIST_ITEM_SUCCESS = "ADD_PLAYLIST_ITEM_SUCCESS";
export const ADD_PLAYLIST_ITEM_FAIL = "ADD_PLAYLIST_ITEM_FAIL";

export const LIST_PLAYLIST_ITEMS_REQUEST = "LIST_PLAYLIST_ITEMS_REQUEST";
export const LIST_PLAYLIST_ITEMS_SUCCESS = "LIST_PLAYLIST_ITEMS_SUCCESS";
export const LIST_PLAYLIST_ITEMS_FAIL = "LIST_PLAYLIST_ITEMS_FAIL";

export const playlistAddReducer = (state = {}, action) => {
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
export const listPlaylistReducer = (state = { playlist: [] }, action) => {
	switch (action.type) {
		case LIST_PLAYLIST_ITEMS_REQUEST:
			return { loading: true };
		case LIST_PLAYLIST_ITEMS_SUCCESS:
			return { loading: false, playlist: action.payload };
		case LIST_PLAYLIST_ITEMS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
