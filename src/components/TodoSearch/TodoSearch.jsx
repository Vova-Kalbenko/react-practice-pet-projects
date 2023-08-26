import React from 'react'
// import {toast} from 'react-toastify'

const TodoSearch = ({searchTodo, changeSearch }) => {

    return (
        <form 
         className='todo-form'>
            <label>
                <input
                    placeholder='Search your Todo'
                    value={searchTodo}
                    onChange={changeSearch}
                    name='text'
                    className='todo-input edit'
                    autoFocus
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <button type="submit" className='todo-button edit'>Search Todo</button>
        </form>
    )
}

export default TodoSearch