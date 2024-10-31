import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/TaskSlice";
import { saveState } from "./LocalStorage";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

store.subscribe(() => {
    saveState(store.getState().tasks);
  });