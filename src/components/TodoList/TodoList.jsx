import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import inithialTodos from './todos.json'
import TodoSearch from 'components/TodoSearch/TodoSearch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './TodoList.module.css'
import { BsEmojiSmile } from 'react-icons/bs';
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
        return
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
        return
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
  const [searchTodo, setSearchTodo] = useState('')
   const changeSearch = e => {

    // console.log(e)
    setSearchTodo(e.target.value);
  };

  const getVisibleTodos = () => {
    const normalizedSearch = searchTodo.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedSearch)
    );
  };

  const visibleTodos = getVisibleTodos();
  const completedTodos = calcCompletedTodos();
  return (
    <>
      <h1 className={css.mainTitle}>Todos</h1>
      <p className={css.stats}>Total TODOS: {todos.length}</p>
      <p className={css.stats}>Completed Todos: {completedTodos} </p>
      <p className={css.stats}>Click on Todo to make it completed <BsEmojiSmile/></p>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={visibleTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <TodoSearch value={searchTodo} changeSearch={changeSearch}/>
      <ToastContainer/>

    </>
  );
}

