import { addProject, deleteProject } from "../actions/project";

export const addProjectDispatch = (project) => {
  return (dispatch) => {
    dispatch(addProject(project));
  };
};
export const deleteProjectDispatch = (index) => {
  return (dispatch) => {
    dispatch(deleteProject(index));
  };
};
