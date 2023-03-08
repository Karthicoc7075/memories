import { combineReducers } from "redux";

import Posts from './Posts'
import Auth from "./Auth";
export const reducers= combineReducers({Posts,Auth})