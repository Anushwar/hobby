import {
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../actions/project";

export default (state = { projects: [] }, action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      return { ...state, projects: [...state.projects, action.project] };
    }
    case DELETE_PROJECT: {
      const projects = [...state.projects];
      projects.splice(action.index, 1);
      return { ...state, projects };
    }
    case UPDATE_PROJECT: {
      const projects = [...state.projects];
      projects[action.index] = action.project;
      return { ...state, projects };
    }
    default: {
      return { ...state };
    }
  }
};
