export const ADD_HOBBY = "ADD_HOBBY";
export const DELETE_HOBBY = "DELETE_HOBBY";

export const addHobby = (hobby) => ({
  type: ADD_HOBBY,
  hobby,
});

export const deleteHobby = (index) => ({
  type: DELETE_HOBBY,
  index,
});
