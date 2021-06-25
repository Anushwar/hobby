import { addHobby, deleteHobby } from "../actions/hobbies";

export const addHobbyDispatch = (hobby) => {
  return (dispatch) => {
    dispatch(addHobby(hobby));
    console.log(hobby);
  };
};
export const deleteHobbyDispatch = (index) => {
  return (dispatch) => {
    dispatch(deleteHobby(index));
  };
};
