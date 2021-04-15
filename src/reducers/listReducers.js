import {
	MUSIC_LIST_REQUEST,
	MUSIC_LIST_SUCCESS,
	MUSIC_LIST_FAIL,
} from "../constants/listConstants";

export const musicListReducer = (state = { music: [] }, action) => {
	switch (action.type) {
		case MUSIC_LIST_REQUEST:
			return { loading: true, products: [] };
		case MUSIC_LIST_SUCCESS:
			return {
				loading: false,
				music: action.payload.music,
			};
		case MUSIC_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
