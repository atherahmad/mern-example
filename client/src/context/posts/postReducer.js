
export const postState =[]

const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_POSTS":
      return action.payload;
    case "CREATE_POST":
      return [...state, action.payload];
    case "UPDATE_POST":
      return state.map((story) =>
        story._id === action.payload._id ? action.payload : story
      );
    case "DELETE_POST":
      return state.filter((story) => story._id !== action.payload);
    default:
      return state;
  }
};
export default postReducer;