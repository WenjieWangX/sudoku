export const position = (state = [], action) => {
  if (action.type === "SET_CURRENT_POSITION") {
    return action.payload;
  }
  return state;
};
