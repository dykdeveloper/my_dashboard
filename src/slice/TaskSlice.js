import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../storage/LocalStorage";

const initialState = loadState() || {};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initializeUserTasks: (state, action) => {
      const userId = action.payload;
      if (!state[userId]) {
        state[userId] = {
          lastId: 0,
          tasks: [],
          expiredTasks: [],
          completedTasks: [],
        };
        saveState(state); 
      }
    },
    addTask: (state, action) => {
      const { userId, task } = action.payload;

      if (!state[userId]) {
        state[userId] = {
          lastId: 0,
          tasks: [],
          expiredTasks: [],
          completedTasks: [],
        };
      }

      state[userId].lastId += 1;
      const newTask = { ...task, id: state[userId].lastId };
      if (!Array.isArray(state[userId].tasks)) {
        state[userId].tasks = [];
      }
      state[userId].tasks.push(newTask);
      saveState(state);
      if (
        state[userId].tasks.length === 0 &&
        state[userId].expiredTasks.length === 0 &&
        state[userId].completedTasks.length === 0
      ) {
        state[userId].lastId = 0;
      }
    },

    deletetask: (state, action) => {
      const { userId, taskId } = action.payload;

      if (state[userId]) {
        state[userId].tasks = state[userId].tasks.filter(
          (task) => task.id !== taskId
        );
        state[userId].expiredTasks = state[userId].expiredTasks.filter(
          (task) => task.id !== taskId
        );
      }

      if (state[userId].tasks.length === 0 && state[userId].expiredTasks.length === 0) {
        state[userId].lastId = 0;
      }
      saveState(state);
      if (
        state[userId].tasks.length === 0 &&
        state[userId].expiredTasks.length === 0 &&
        state[userId].completedTasks.length === 0
      ) {
        state[userId].lastId = 0;
      }
    },

    updatetask: (state, action) => {
      const { userId, taskId, updatedData } = action.payload;
      if (state[userId]) {
        const index = state[userId].tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          state[userId].tasks[index] = { ...state[userId].tasks[index], ...updatedData };
          saveState(state);
        }
      }
    },

    expireTask1: (state, action) => {
      const { userId, taskId } = action.payload;

      if (state[userId]){
        const taskIndex = state[userId].tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          const [expiredTask] = state[userId].tasks.splice(taskIndex, 1);
          expiredTask.status = "expired";
          if (!Array.isArray(state[userId].expiredTasks)) {
            state[userId].expiredTasks = [];
          }
          state[userId].expiredTasks.push(expiredTask);
          saveState(state);
        }
      }
    },

    completeTask: (state, action) => {
      const { userId, taskId } = action.payload;

      if (state[userId]){
        const taskIndex = state[userId].tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          const [completedTask] = state[userId].tasks.splice(taskIndex, 1);
          completedTask.status = "completed";
          if (!Array.isArray(state[userId].completedTasks)) {
            state[userId].completedTasks = [];
          }
          state[userId].completedTasks.push(completedTask);
          saveState(state);
        }
      }
    },

    resetexpireTasks: (state, action) => {
      const { userId } = action.payload;

      state[userId].expiredTasks = [];
      if (
        state[userId].tasks.length === 0 &&
        state[userId].expiredTasks.length === 0 &&
        state[userId].completedTasks.length === 0
      ) {
        state[userId].lastId = 0;
      }
    },
    resetcompleteTasks: (state, action) => {
      const { userId } = action.payload;


      state[userId].completedTasks = [];
      if (
        state[userId].tasks.length === 0 &&
        state[userId].expiredTasks.length === 0 &&
        state[userId].completedTasks.length === 0
      ) {
        state[userId].lastId = 0;
      }
    },
  },
});

export const {
  addTask,
  deletetask,
  updatetask,
  expireTask1,
  completeTask,
  resetexpireTasks,
  resetcompleteTasks,
  initializeUserTasks,
  updateTaskStatus
} = taskSlice.actions;
export default taskSlice.reducer;
