import {
  LOGIN,
  REGISTER,
  DELETE_USER,
  GET_USER,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_GOOGLE,
  ADD_WATCHED,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_ROLE,
} from "../constants/actionTypes";

export default (userState = { user: {}, token: null, role: null }, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGIN_GOOGLE:
    case REGISTER:
      return action.payload;
    case LOGOUT:
      return { user: {}, token: null };
    case CHECK_LOGIN:
      return { user: action.payload.data, token: action.payload.token };
    case ADD_FAVORITE:
    case ADD_WATCHED:
    case REMOVE_FAVORITE:
      return { ...userState, user: action.payload };
    case SET_ROLE:
      return { ...userState, role: action.payload };
    default:
      return userState;
  }
};
