import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../storage/LocalStorage";

const initialState = loadState() || {
  tasks: [],
  lastId: 0, 
  expiredTasks: [],
  completeTasks: [],
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
        expiredTask.status = "expired";
        state.expiredTasks.push(expiredTask);
      }
    },
    completeTask: (state, action) =>{
      state.tasks = state.tasks || [];
      state.completedTasks = state.completedTasks || [];
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [completedTask] = state.tasks.splice(taskIndex, 1);
        completedTask.status = "completed";
        state.completedTasks.push(completedTask); 
      }
    }
  },
});

export const { addTask, deletetask, updatetask, expireTask1, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
