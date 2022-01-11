import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const res = await axios('http://localhost:4000/todos');
  return res.data;
});

export const addTodosAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
  const res = await axios.post('http://localhost:4000/todos', data)
  return res.data;
});

export const toogleTodoAsync = createAsyncThunk('todos/toogleTodoAsync', async ({ id, data }) => {
  const res = await axios.patch(`http://localhost:4000/todos/${id}`, data);
  return res.data;
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
  await axios.delete(`http://localhost:4000/todos/${id}`);
  return id;
});

export const todosSlice = createSlice({
  name:'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: 'all',
    addNewTodoIsLoding: false,
    addNewTodoError: null
  },
  reducers: {
    destroy: (state, action) => {
      const { id } = action.payload;
      const filtered = state.items.filter(item => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter(item => item.completed === false);
      state.items = filtered;
    }
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [addTodosAsync.pending]: (state, action) => {
      state.addNewTodoIsLoding = true;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoding = false;
    },
    [addTodosAsync.rejected]: (state, action) => {
      state.addNewTodoIsLoding = false;
      state.addNewTodoError = action.error.message;
    },
    [toogleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },
    [removeTodoAsync.fulfilled]: (state, action) => {
      const  id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    }
  }
});

export const selectTodos = (state) => state.todos.items; 
export const selectTodosFiltered = (state) => {
  if (state.todos.activeFilter === 'all') {
    return state.todos.items;
  } 

  return state.todos.items.filter((todo) => 
    state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true)
}

export const { changeActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;