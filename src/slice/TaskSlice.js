import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../storage/LocalStorage";

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadState(),
  reducers: {
    addTask: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1 });
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
