import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { toogle, destroy } from '../../../redux/todos/todosSlice';

function List() {
  const items = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const handleDestroy = (id) => {
    const confirm = window.confirm('Are you sure ?');

    if(confirm) {
      dispatch(destroy({id: id}))
    }
  }
  return (
    <ul className="todo-list">
      {items.map((item) => (
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
