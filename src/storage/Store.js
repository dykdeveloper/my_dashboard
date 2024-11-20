import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/TaskSlice";
import authReducer from "../slice/AuthSlice"
import { loadState, saveState } from "./LocalStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;