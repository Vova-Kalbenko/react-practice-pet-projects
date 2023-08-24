import React, { useState } from 'react'

const TodoSearch = () => {
    const [searchTodo, setSearchTodo] = useState('')

    const handleSearchTodo = (e) => {
        e.preventdefault()
        setSearchTodo(e.target.value)
    }


    return (
        <form onSubmit={handleSearchTodo} className='todo-form'>
            <label>
                <input
                    placeholder='Update your item'
                    value={searchTodo}
                    // onChange={handleSearchTodo}
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