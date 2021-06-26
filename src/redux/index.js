/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import { PROJECT_REDUX_STORE } from "../constants";
import reducers from "./reducers";

const persistedStoreString = localStorage.getItem(PROJECT_REDUX_STORE);
const persistedStore = persistedStoreString
  ? JSON.parse(persistedStoreString)
  : {};
const store = createStore(
  reducers,
  persistedStore,
  process.env.REACT_APP_BUILD_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem(PROJECT_REDUX_STORE, JSON.stringify(store.getState()));
});

export default store;
