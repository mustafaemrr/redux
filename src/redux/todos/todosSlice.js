import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name:'todos',
  initialState: {
    items: [
      {
        id: 1,
        title: 'Lorem ipsum sit dolar',
        completed: false
      }
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toogle: (state, action) => {
      const {id} = action.payload;
      const item = state.items.find(item => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const { id } = action.payload;
      const filtered = state.items.filter(item => item.id !== id);
      state.items = filtered;
    }
  }
});

export const { addTodo, toogle, destroy } = todosSlice.actions;
export default todosSlice.reducer;