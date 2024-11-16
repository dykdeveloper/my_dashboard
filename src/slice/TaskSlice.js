import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../storage/LocalStorage";

const initialState ={
  lastId: 0,
  tasks: loadState().tasks || [],
  expiredTasks: loadState().expiredTasks || [],
  completedTasks: loadState().completedTasks || [], 
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.lastId += 1;
      const newTask = { ...action.payload, id: state.lastId };
      if (!Array.isArray(state.tasks)) {
        state.tasks = [];
      }
      state.tasks.push(newTask);
      saveState(state);
      if (state.tasks.length === 0 && state.expiredTasks.length === 0 && state.completedTasks.length === 0) {
        state.lastId = 0;
      }
    },
    deletetask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.expiredTasks = state.expiredTasks.filter(
        (task) => task.id !== action.payload
      );
      if (state.tasks.length === 0 && state.expiredTasks.length === 0) {
        state.lastId = 0;
      }
      saveState(state);
      if (state.tasks.length === 0 && state.expiredTasks.length === 0 && state.completedTasks.length === 0) {
        state.lastId = 0;
      }
    },
    updatetask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        saveState(state);
      }
    },
    expireTask1: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [expiredTask] = state.tasks.splice(taskIndex, 1);
        expiredTask.status = "expired";
        if (!Array.isArray(state.expiredTasks)) {
          state.expiredTasks = [];
        }
        state.expiredTasks.push(expiredTask);
        saveState(state);
      }
    },
    completeTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [completedTask] = state.tasks.splice(taskIndex, 1);
        completedTask.status = "completed";
        if (!Array.isArray(state.completedTasks)) {
          state.completedTasks = [];
        }
        state.completedTasks.push(completedTask);
        saveState(state);
      }
    },
    resetexpireTasks : (state) =>{
      state.expiredTasks = [];
      if (state.tasks.length === 0 && state.expiredTasks.length === 0 && state.completedTasks.length === 0) {
        state.lastId = 0;
      }
    },
    resetcompleteTasks : (state) =>{
      state.completedTasks = [];
      if (state.tasks.length === 0 && state.expiredTasks.length === 0 && state.completedTasks.length === 0) {
        state.lastId = 0;
      }
    }
  },
});

export const { addTask, deletetask, updatetask, expireTask1, completeTask, resetexpireTasks, resetcompleteTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
