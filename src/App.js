import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import {Context} from './context';
export default function App() {

  const [ todos, SetTodos ] = useState([
          // {id: 1, title: 'First todo', completed: false},
          // {id: 2, title: 'Second todo', completed: true},
  ]);
  const [ todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem("todos") || [];
    SetTodos(JSON.parse(raw));
  }, [])
  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = event => {
    if (event.key === 'Enter') {
      SetTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false
        }
      ]);
      setTodoTitle('');
    }
  }

  const removeTodo = id => {
    SetTodos(todos.filter(todo => {
     return todo.id !== id;
  }))
};
  const toggleTodo = id => {
    SetTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  };

    return (
      <Context.Provider value={{removeTodo, toggleTodo}}>
        <div className="container">
          <h1>Todo app</h1>

            <div className="input-field">
              <input 
              type="text" 
              value = {todoTitle}
              onChange = {event => setTodoTitle(event.target.value)}
              onKeyPress = {addTodo}
              />
              <label>Todo name</label>
            </div>

            <TodoList todos={todos} />
        </div>
      </Context.Provider>
    );
}