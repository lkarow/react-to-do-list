import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [showCompletedTodos, setshowCompletedTodos] = useState(true);
  const inputRef = useRef();

  // Load locally stored todos once
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Store todos locally
  useEffect(() => {
    if (todos.length) localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const name = inputRef.current.value;
    if (name === '') return;

    setTodos((previousTodos) => {
      return [...previousTodos, { id: uuidv4(), name: name, completed: false }];
    });
    inputRef.current.value = null;
  };

  // Toggle todo as completed or uncompleted
  const toggleCompleteTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  // Delete todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todoID) => todoID !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // Toggle display of completed todos
  const toggleDisplayCompletedTodos = () => {
    setshowCompletedTodos(!showCompletedTodos);
  };

  // Add todo on keydown 'Enter' in input
  const handleKeydown = (e) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  return (
    <div className="app-wrap">
      <h1>To-do list</h1>
      <input
        className="input"
        type="text"
        ref={inputRef}
        onKeyDown={handleKeydown}
      ></input>
      <button className="btn" onClick={handleAddTodo}>
        Add
      </button>
      <button className="btn" onClick={toggleDisplayCompletedTodos}>
        {/* Change button text according to showCompletedTodos */}
        {showCompletedTodos ? 'Hide completed tasks' : 'Show completed tasks'}
      </button>
      <TodoList
        todos={todos}
        showCompletedTodos={showCompletedTodos}
        toggleCompleteTodo={toggleCompleteTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
