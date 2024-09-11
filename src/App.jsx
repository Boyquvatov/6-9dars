
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './App.css';

const DEFAULT_LIMIT = 10; 

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_LIMIT);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [currentPage, itemsPerPage]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`);
      const data = await response.json();
      const totalResponse = await fetch("https://jsonplaceholder.typicode.com/todos");
      const totalData = await totalResponse.json();
      
      setTodos(data);
      setTotalItems(totalData.length);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos(); 
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTodo({ title: '', completed: false });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedTodo) => {
    try {
      if (isAdding) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTodo),
        });
        const newTodo = await response.json();

        setTodos(prevTodos => [newTodo, ...prevTodos].slice(0, itemsPerPage));
  
        setTotalItems(prevTotal => prevTotal + 1);
      } else {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTodo),
        });
  
        fetchTodos();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save todo", error);
    }
  };
  

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className='add'>
        <h1 style={{ textAlign: "center", margin: "30px" }}>Todos List</h1>
        <button className='add-btn' onClick={handleAdd}>Add</button>
      </div>
      <div className='controls'>
        <label htmlFor="limit-select">Items per page:</label>
        <select
          id="limit-select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
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
      
      <div className='pagination'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          data={selectedTodo}
          isAdding={isAdding}
        />
      )}
    </>
  );
}

export default App;
