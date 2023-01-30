import { combineReducers, createStore, compose } from "redux";

import { hookUserReducer } from "./reducers/hookUserReducer";

const rootReducer = combineReducers({
  hookUserReducer,
});

export const store = createStore(
  rootReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
