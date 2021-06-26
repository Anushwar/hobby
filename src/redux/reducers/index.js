import { combineReducers } from "redux";
import projectReducer from "./project";

const reducer = combineReducers({
  projectsData: projectReducer,
});

export default reducer;
