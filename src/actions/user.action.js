import {
  LOGIN,
  REGISTER,
  DELETE_USER,
  GET_USER,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_GOOGLE,
  ADD_FAVORITE,
  ADD_WATCHED,
  REMOVE_FAVORITE,
  SET_ROLE,
} from "../constants/actionTypes";
import * as api from "../apis";

export const registerUser = (user, setCookies) => async (dispatch) => {
  try {
    await api.registerUser(user);
    const { data } = await api.loginUser({ email: user.email, password: user.password });
    await setCookies("user", data.token, { path: "/" });
    dispatch({ type: REGISTER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = (user, setCookies) => async (dispatch) => {
  try {
    const { data } = await api.loginUser({ email: user.email, password: user.password });
    await setCookies("user", data.token, { path: "/" });
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    return error.response.data.message;
  }
};
export const logoutUser = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
export const checkLogin = (token) => async (dispatch) => {
  try {
    if (token) {
      const check = await api.checkLogin(token);
      if (check.data) {
        const { data } = await api.getUser(token);
        dispatch({ type: CHECK_LOGIN, payload: { data, token } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const loginGoogle = (user, setCookies) => async (dispatch) => {
  try {
    const { data } = await api.loginGoogle(user);
    setCookies("user", data.token, { path: "/" });
    dispatch({ type: LOGIN_GOOGLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addFavorite = (id, idFilm) => async (dispatch) => {
  try {
    const { data } = await api.addFavorite(id, idFilm);
    console.log(data);
    dispatch({ type: ADD_FAVORITE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addWatched = (id, idFilm) => async (dispatch) => {
  try {
    const { data } = await api.addWatched(id, idFilm);
    dispatch({ type: ADD_WATCHED, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removeFavorite = (id, idFilm) => async (dispatch) => {
  try {
    const { data } = await api.removeFavorite(id, idFilm);
    console.log(data);
    dispatch({ type: REMOVE_FAVORITE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const setRole = (id) => async (dispatch) => {
  try {
    if (id === "6034acc0a07a4a22ecd6f0a5") {
      dispatch({ type: SET_ROLE, payload: "admin" });
    } else {
      dispatch({ type: SET_ROLE, payload: "normal" });
    }
  } catch (error) {
    console.log(error);
  }
};
