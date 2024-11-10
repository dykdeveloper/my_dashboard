import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../storage/LocalStorage";

const initialState = {
  tasks: loadState().tasks || [],
  lastId: loadState().lastId || 0, 
  expiredTasks: loadState().expiredTasks || [],
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
      state.expiredTasks = state.expiredTasks.filter(
        (task) => task.id !== action.payload
      );
      if (state.tasks.length === 0 && state.expiredTasks.length === 0) {
        state.lastId = 0;
      }
    },
    updatetask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    expireTask1: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [expiredTask] = state.tasks.splice(taskIndex, 1);
        state.expiredTasks.push({ ...expiredTask, status: "expired" });
      }
    },
    clearExpiredTasks: (state) => {
      const now = new Date();
      state.expiredTasks = state.expiredTasks.filter((task) => {
        const taskExpirationDate = new Date(task.startDate);
        return taskExpirationDate >= now.setHours(0, 0, 0, 0);
      });
    },
  },
});

export const { addTask, deletetask, updatetask, expireTask1, clearExpiredTasks } = taskSlice.actions;
export default taskSlice.reducer;
