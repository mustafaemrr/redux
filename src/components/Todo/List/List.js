import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { destroy, selectTodosFiltered, getTodosAsync, toogleTodoAsync} from '../../../redux/todos/todosSlice';
import Loading from '../Loading';
import Error from '../Error';

function List() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectTodosFiltered);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = (id) => {
    const confirm = window.confirm('Are you sure ?');

    if (confirm) {
      dispatch(destroy({id: id}))
    }
  }

  const handleToogle = async (id, completed) => {
    await dispatch(toogleTodoAsync({id, data: { completed } }))
  }
  

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input className="toggle" type="checkbox" checked={item.completed} onChange={() => handleToogle(item.id, !item.completed)}/>
            <label>{item.title}</label>
            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default List
