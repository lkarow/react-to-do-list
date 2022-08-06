import React from 'react';

export default function Todo(props) {
  const { todo, toggleCompleteTodo, deleteTodo } = props;

  const handleToggleComplete = () => {
    toggleCompleteTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo);
  };

  return (
    <div className="todo">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        ></input>
        {todo.name}
      </label>

      <button onClick={handleDeleteTodo}>delete</button>
    </div>
  );
}
