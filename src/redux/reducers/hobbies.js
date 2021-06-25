import { ADD_HOBBY, DELETE_HOBBY } from "../actions/hobbies";

export default (state = { hobbies: [] }, action) => {
  switch (action.type) {
    case ADD_HOBBY: {
      return { ...state, hobbies: [...state.hobbies, action.hobby] };
    }
    case DELETE_HOBBY: {
      return { ...state, hobbies: state.hobbies.splice(action.index, 1) };
    }
    default: {
      return { ...state };
    }
  }
};
