import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

function List() {
  const items = useSelector(state => state.todos.items);

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{item.title}</label>
            <button className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default List
