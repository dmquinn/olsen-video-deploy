const initialState = { playlistItem: [] };
const playlistReducer = (state = { playlist: [] }, action) => {
	switch (action.type) {
		case "ADD_PLAYLIST_ITEM":
			return {
				...state,
				playlist: [...state.playlist, action.payload],
			};
		case "DELETE_PLAYLIST_ITEM":
			return {
				...state,
				playlist: state.playlist.filter(
					(playlistItem) => playlistItem.id !== action.payload
				),
			};
		default:
			return state;
	}
};
export default playlistReducer;
