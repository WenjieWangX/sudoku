export const animationSpeed = (state = "Slow", action) => {
  if (action.type === "SET_ANIMATION_SPEED") {
    return action.payload;
  }
  return state;
};
