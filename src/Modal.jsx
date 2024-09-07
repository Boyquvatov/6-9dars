
import React, { useState } from 'react';
import "./Modal.css"

const Modal = ({ isOpen, onClose, onSave, data }) => {
  const [title, setTitle] = useState(data.title);
  const [completed, setCompleted] = useState(data.completed);

  const handleSave = () => {
    onSave({ ...data, title, completed });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Completed:
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)}  className='check'/>
        </label>
        <div className='btns'>
            <button onClick={handleSave} className='save-btn'>Save</button>
            <button onClick={onClose} className='cancel-btn'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
