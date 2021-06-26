import { ADD_PROJECT, DELETE_PROJECT } from "../actions/project";

export default (state = { projects: [] }, action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      return { ...state, projects: [...state.projects, action.project] };
    }
    case DELETE_PROJECT: {
      return { ...state, projects: state.projects.splice(action.index, 1) };
    }
    default: {
      return { ...state };
    }
  }
};
