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
import * as api from "../apis";

export const createFilm = (film) => async (dispatch) => {
  try {
    const { data } = await api.createFilm(film);
    dispatch({ type: CREATE_FILM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getFilms = () => async (dispatch) => {
  try {
    const { data } = await api.getFilms();
    dispatch({ type: GET_FILMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateFilm = (id, film) => async (dispatch) => {
  try {
    const { data } = await api.updateFilm(id, film);
    console.log(data);
    dispatch({ type: UPDATE_FILM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removeFilm = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFilm(id);
    dispatch({ type: REMOVE_FILM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getSingleFilm = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSingleFilm(id);
    dispatch({ type: GET_SINGLE_FILM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const setIsEdit = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_IS_EDIT, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const getFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFavorites(id);
    dispatch({ type: GET_FAVORITES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getWatched = (id) => async (dispatch) => {
  try {
    const { data } = await api.getWatched(id);
    dispatch({ type: GET_WATCHED, payload: data });
  } catch (error) {
    console.log(error);
  }
};
