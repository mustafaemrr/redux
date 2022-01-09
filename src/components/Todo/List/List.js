import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { toogle, destroy, selectTodos } from '../../../redux/todos/todosSlice';

function List() {
  const items = useSelector(selectTodos);
  const activeFilter = useSelector(state => state.todos.activeFilter);
  const dispatch = useDispatch();
  let filtered = [];

  const handleDestroy = (id) => {
    const confirm = window.confirm('Are you sure ?');

    if (confirm) {
      dispatch(destroy({id: id}))
    }
  }

  filtered = items;
  if (activeFilter !== 'all') {
    filtered = items.filter((todo) => (
      activeFilter === 'active' ? todo.completed === false : todo.completed === true
    ));
  }

  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input className="toggle" type="checkbox" checked={item.completed} onChange={() => dispatch(toogle({id: item.id}))}/>
            <label>{item.title}</label>
            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default List
