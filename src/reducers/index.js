import { combineReducers } from "redux";

import films from "./film.reducer";
import users from "./user.reducer";

export const reducers = combineReducers({ films, users });
