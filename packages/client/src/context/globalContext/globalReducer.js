import {
  LOG_IN,
  LOG_OUT,
  UPDATE_LIBRARY,
  LOAD_LIBRARY,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
   
    case UPDATE_LIBRARY:
      return;

    case LOAD_LIBRARY:
      return {
        ...state,
        albums:action.payload.album_list,
        artists:action.payload.artist_list,
        songs:action.payload.song_list,
        username: action.payload.username,
        userId: action.payload._id,
      };
      case SET_LOADING:
        return {
          ...state,
          loading: true
        }
    default:
      return state;
  }
};
