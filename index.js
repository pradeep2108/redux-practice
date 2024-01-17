//practicing action in redux

const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first-redux-action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "second-redux-action",
  };
}

//(previousState, action) = newState

// const initialState = {
//   numOfCake: 10,
//   numOfIceCream: 10,
// };

const initialCakeState = {
  numOfCake: 10,
};
const initialIceCreamState = {
  numOfIceCream: 10,
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numOfCake: state.numOfCake - 1,
//       };
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numOfIceCream: state.numOfIceCream - 1,
//       };
//     default:
//       return state;
//   }
// };
//each reducers managing it's own part of global state
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

// the convention is to call the combination of all your reducers as the root reducer
// to access cake specify state.cake.numberOfIceCreams
// cake and iceCream here correspond to the key we specified while combining the two reducers
// when we dipatch the action both reducers receive the action whereas one respond others ignores it
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);
console.log("Initial state", store.getState());
const unSubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyCake());
unSubscribe();

// Middleware
// is the suggested way to extend redux with custom functionality
// provided third party extension point between dispatching an action and the moment it reaches the reducer
// Use middleware for loggin, crash reporting, performing asynchronous tasks etc
