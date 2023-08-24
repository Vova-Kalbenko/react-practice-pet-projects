import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import inithialTodos from './todos.json'
import TodoSearch from 'components/TodoSearch/TodoSearch';
import { toast, ToastContainer } from 'react-toastify/dist/components';
import 'react-toastify/dist/ReactToastify.css';
export default function TodoList() {
  const [todos, setTodos] = useState(inithialTodos);

  useEffect(() => {
    const lsTodos = JSON.parse(localStorage.getItem('todos'));
    if (lsTodos) {
      setTodos(lsTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const todosTasks = todos.map(todo => todo.text);

  const addTodo = todo => {

    const matchTodo = todosTasks.some(
      todoTask => todo.text.toLowerCase() === todoTask.toLowerCase()
    )

    if (matchTodo) {
      toast.error('🦄 Todo is already in the list!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else if (todo.text === '') {
      toast.warn('🦄 All fields must be filled in!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    setTodos(((prevTodos) => [...prevTodos, todo]));
    
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const updateTodo = (todoId, newValue) => {
    if (newValue.text === '') {
      return;
    }

    setTodos(prevState => prevState.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      // console.log(todo)
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const calcCompletedTodos = () => {

    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  const completedTodos = calcCompletedTodos();
  return (
    <>
      <h1>Todos</h1>
      <p>Total TODOS:{todos.length}</p>
      <p>Completed Todos:{completedTodos}</p>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <TodoSearch />
      <ToastContainer/>

    </>
  );
}

