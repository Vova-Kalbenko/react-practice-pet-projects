import React, { useState } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (todo.text === '') {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    // console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (newValue.text === '') {
      return;
    }

    setTodos(prevState => prevState.map(item => ( item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      // console.log(todo)
      if (todo.id === id){
        return {
          ...todo,
          completed: !todo.completed,
        };
       

      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Todos</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
