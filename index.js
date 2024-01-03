//practicing action in redux

const BUY_CAKE = "BUY_CAKE";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first-redux-action",
  };
}

//(previousState, action) = newState

const initialState = {
  numOfCake: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.initialState - 1,
      };
    default:
      return state;
  }
};
