import axios from "./axios";

export const loginUser = (user) => axios.post("/api/users/login", user);
export const registerUser = (user) => axios.post("/api/users/register", user);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);
export const getUser = (token) => axios.get("/api/users", { headers: { "x-auth-token": token } });
export const checkLogin = (token) =>
  axios.post("/api/users/isValidToken", null, { headers: { "x-auth-token": token } });
export const loginGoogle = (user) => axios.post("/api/users/loginGoogle", user);
export const getFavorites = (id) => axios.get(`/api/users/fav/${id}`);
export const getWatched = (id) => axios.get(`/api/users/wat/${id}`);
export const addFavorite = (id, idFilm) => axios.patch(`/api/users/addfav/${id}`, { id: idFilm });
export const addWatched = (id, idFilm) => axios.patch(`/api/users/addwat/${id}`, { id: idFilm });
export const removeFavorite = (id, idFilm) => axios.patch(`/api/users/removefav/${id}`, { id: idFilm });

export const createFilm = (film) => axios.post("/api/films/", film);
export const deleteFilm = (id) => axios.delete(`/api/films/${id}`);
export const updateFilm = (id, film) => axios.patch(`/api/films/${id}`, film);
export const getFilms = () => axios.get("/api/films");
export const getSingleFilm = (id) => axios.get(`/api/films/${id}`);
