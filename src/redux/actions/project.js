export const ADD_PROJECT = "ADD_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const addProject = (project) => ({
  type: ADD_PROJECT,
  project,
});

export const deleteProject = (index) => ({
  type: DELETE_PROJECT,
  index,
});
