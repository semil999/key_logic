import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import postReducer from "./postReducer";

export const rootReducer = combineReducers({
    user : userDataReducer,
    post : postReducer
})