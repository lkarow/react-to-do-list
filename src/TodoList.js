import React from 'react';
import Todo from './Todo';

export default function TodoList(props) {
  const { todos, toggleCompleteTodo, deleteTodo, showCompletedTodos } = props;

  if (showCompletedTodos) {
    return todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          toggleCompleteTodo={toggleCompleteTodo}
          deleteTodo={deleteTodo}
        />
      );
    });
  }

  if (!showCompletedTodos) {
    return (
      <div className="todo-list">
        {/* Filter completed todos and list only uncompleted todos */}
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                toggleCompleteTodo={toggleCompleteTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
      </div>
    );
  }
}
