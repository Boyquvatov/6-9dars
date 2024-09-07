// App.js
import React, { useState } from 'react';
import { data } from "./data.js";
import Modal from './Modal';
import './App.css';

function App() {
  const [todos, setTodos] = useState(data);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleSave = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "30px" }}>Todos list</h1>
      <div className='todos'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(todo => (
                <tr key={todo.id} className={todo.completed ? 'table-active' : 'table-inactive'}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed.toString()}</td>
                  <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button className='delete-btn' onClick={() => handleDelete(todo.id)}>Delete</button>
                    <button className='edit-btn' onClick={() => handleEdit(todo)}>Edit</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      
      {selectedTodo && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          data={selectedTodo}
        />
      )}
    </>
  );
}

export default App;
