import React, { useState, } from 'react';
import shortid from 'shortid';
function TodoForm(addTodo) {
  const [input, setInput] = useState(addTodo.edit ? addTodo.edit.value : '');

  // console.log(addTodo)



  const handleChange = e => {
    setInput(e.target.value);
    // console.log(addTodo.edit)
  };

  const handleSubmit = e => {
    e.preventDefault();

    addTodo.onSubmit({
      id: shortid.generate(),
      text: input
    });
    setInput('');
  };
  // render according to condition if updateInput is open
  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {addTodo.edit ? (
        <>
          <label>
            <input
              placeholder='Update your item'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input edit'
              autoFocus
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <button type='submit' onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input'
              autoFocus
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <button type='submit' onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
