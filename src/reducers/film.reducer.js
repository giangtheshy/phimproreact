import {
  CREATE_FILM,
  GET_FILMS,
  GET_SINGLE_FILM,
  UPDATE_FILM,
  REMOVE_FILM,
  SET_IS_EDIT,
  GET_FAVORITES,
  GET_WATCHED,
} from "../constants/actionTypes";

export default (state = { films: [], isEdit: null, favorites: [], watched: [], film: null }, action) => {
  switch (action.type) {
    case CREATE_FILM:
      return { ...state, films: [...state.films, action.payload] };
    case GET_FILMS:
      return { ...state, films: action.payload };
    case SET_IS_EDIT:
      return { ...state, isEdit: action.payload };
    case GET_FAVORITES:
      return { ...state, favorites: action.payload };
    case GET_WATCHED:
      return { ...state, watched: action.payload };
    case GET_SINGLE_FILM:
      return { ...state, film: action.payload };
    case REMOVE_FILM:
      return { ...state, films: state.films.filter((film) => film._id !== action.payload._id) };
    case UPDATE_FILM:
      return { ...state, films: state.films.map((film) => (film._id === action.payload._id ? action.payload : film)) };
    default:
      return state;
  }
};
