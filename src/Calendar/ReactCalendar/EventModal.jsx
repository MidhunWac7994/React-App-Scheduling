import React, { useState } from "react";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = () => {
    if (title && designation) {
      onSave(title, designation);
      setTitle("");
      setDesignation("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Event</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Event Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
