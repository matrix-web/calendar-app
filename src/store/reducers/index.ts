import { combineReducers } from "redux";
import authReducer from "./auth";
import EventReducer from "./event";

export const rootReducer = combineReducers({
  auth: authReducer,
  event: EventReducer
});