import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodosAsync } from '../../../redux/todos/todosSlice';

function Form() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const newTodoIsLoding = useSelector((state) => state.todos.addNewTodoIsLoding);
  const error = useSelector((state) => state.todos.addNewTodoError);


  const handleSubmit = async (e) => {
    if (!title) return;

    e.preventDefault();

    await dispatch(addTodosAsync({title}));

    setTitle('');
  }

  return (
    <>
      {
        error && (
          <div>{error}</div>
        )
      }
      <form onSubmit={handleSubmit}>
        <input disabled={newTodoIsLoding} className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />

        { newTodoIsLoding && (
          <img src="https://flevix.com/wp-content/uploads/2020/01/Circle-Loading.svg" alt="" />
        )}
      </form>
    </>
  )
}

export default Form
