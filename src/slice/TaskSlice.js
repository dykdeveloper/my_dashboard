import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../storage/LocalStorage";

const initialState = {
  tasks: loadState().tasks || [],
  lastId: loadState().lastId || 0, 
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.lastId += 1; 
      state.tasks.push({ ...action.payload, id: state.lastId });
    },
    deletetask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (state.tasks.length === 0) {
        state.lastId = 0;
      }
    },
    updatetask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
  },
});

export const { addTask, deletetask, updatetask } = taskSlice.actions;
export default taskSlice.reducer;
