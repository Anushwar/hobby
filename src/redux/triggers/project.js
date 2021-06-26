import { addProject, deleteProject, updateProject } from "../actions/project";

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

export const updateProjectDispatch = (index, project) => {
  return (dispatch) => {
    dispatch(updateProject(index, project));
  };
};
