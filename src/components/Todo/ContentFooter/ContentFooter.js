import React from 'react'
import { useSelector } from 'react-redux';

function ContentFooter() {
  const items = useSelector(state => state.todos.items);
  const itemsLeft = items.filter(item => !item.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong>
        item{itemsLeft > 1 && 's'} left
      </span>

      <ul className="filters">
        <li>
          <a className="selected">All</a>
        </li>
        <li>
          <a>Active</a>
        </li>
        <li>
          <a>Completed</a>
        </li>
      </ul>

      <button className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default ContentFooter
