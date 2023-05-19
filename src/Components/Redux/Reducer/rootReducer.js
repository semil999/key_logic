import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import postReducer from "./postReducer";
import loginUserReducer from "./loginUserReducer";

export const rootReducer = combineReducers({
    user : userDataReducer,
    post : postReducer,
    loginUser : loginUserReducer
})