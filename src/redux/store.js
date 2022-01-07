import { configureStore } from "@reduxjs/toolkit";
import counterSlice from './counter/counterSlice';
import todosSlice from './todos/todosSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice
  },
});