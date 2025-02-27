import { configureStore, createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export default store;
