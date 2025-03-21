import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("Project Manager");
  const [time, setTime] = useState("");
  const [modalState, setModalState] = useState("closed"); // closed, opening, open, closing

  useEffect(() => {
    if (isOpen && modalState === "closed") {
      setModalState("opening");
      setTimeout(() => setModalState("open"), 50); // Trigger animation
    } else if (!isOpen && (modalState === "open" || modalState === "opening")) {
      setModalState("closing");
      setTimeout(() => setModalState("closed"), 300); // Animation duration
    }
  }, [isOpen, modalState]);

  const handleSubmit = () => {
    if (title && role && time) {
      onSave({ title, role, time });
      setTitle("");
      setRole("Project Manager");
      setTime("");
    }
  };

  if (modalState === "closed") return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        modalState === "opening" || modalState === "open" 
          ? "bg-black/70 backdrop-blur-sm" 
          : "bg-transparent backdrop-blur-none"
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white p-6 rounded-md shadow-2xl w-96 max-w-md mx-4 transform transition-all duration-300 ease-out ${
          modalState === "opening" ? "scale-95 opacity-0" :
          modalState === "open" ? "scale-100 opacity-100" :
          "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6 text-black flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add Event
        </h2>
        
        <div className="space-y-5">
          {/* Event Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Event Name</label>
            <input
              type="text"
              className="w-full text-black p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Role</label>
            <select
              className="w-full p-3 bg-white border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Project Manager">Project Manager</option>
              <option value="Team Lead">Team Lead</option>
            </select>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Event Time</label>
            <input
              type="time"
              className="w-full p-3 bg-white border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button 
            className="px-4 py-2.5 bg-white text-black rounded-md border border-gray-300 font-medium hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2.5 bg-black text-white rounded-md font-medium hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
