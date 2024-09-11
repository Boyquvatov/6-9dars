
import React, { useState, useEffect } from 'react';
import "./Modal.css";

const Modal = ({ isOpen, onClose, onSave, data, isAdding }) => {
  const [title, setTitle] = useState(data.title || '');
  const [completed, setCompleted] = useState(data.completed || false);

  useEffect(() => {
    setTitle(data.title || '');
    setCompleted(data.completed || false);
  }, [data]);

  const handleSave = () => {
    onSave({ ...data, title, completed });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isAdding ? 'Add Todo' : 'Edit Todo'}</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Completed:
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className='check'/>
        </label>
        <div className='btns'>
          <button onClick={handleSave} className='save-btn'>{isAdding ? 'Add' : 'Save'}</button>
          <button onClick={onClose} className='cancel-btn'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
