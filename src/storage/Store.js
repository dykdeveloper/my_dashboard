import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/TaskSlice";
import { loadState, saveState } from "./LocalStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;