import { combineReducers } from "redux";
import hobbyReducer from "./hobbies";

const reducer = combineReducers({
  hobbyData: hobbyReducer,
});

export default reducer;
