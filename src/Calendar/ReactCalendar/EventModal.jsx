import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSave, errorMessage }) => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("Project Manager");
  const [startTime, setStartTime] = useState("");  // Start time
  const [endTime, setEndTime] = useState("");      // End time
  const [modalState, setModalState] = useState("closed"); // closed, opening, open, closing
  const [localError, setLocalError] = useState(""); // For form validation errors

  // Handle modal animation states
  useEffect(() => {
    if (isOpen && modalState === "closed") {
      setModalState("opening");
      setTimeout(() => setModalState("open"), 50); // Trigger animation
      
      // Reset form when opening
      setTitle("");
      setRole("Project Manager");
      setStartTime("");
      setEndTime("");
      setLocalError("");
    } else if (!isOpen && (modalState === "open" || modalState === "opening")) {
      setModalState("closing");
      setTimeout(() => setModalState("closed"), 300); // Animation duration
    }
  }, [isOpen, modalState]);

  // Update end time if it becomes invalid after changing start time
  useEffect(() => {
    if (startTime && endTime && endTime <= startTime) {
      // Try to set end time to start time + 1 hour
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      let newHours = startHours + 1;
      
      // Handle overflow (past midnight)
      if (newHours >= 24) {
        newHours = 23;
        setEndTime(`23:59`);
      } else {
        setEndTime(`${newHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`);
      }
    }
  }, [startTime, endTime]);

  const handleSubmit = () => {
    // Validate form
    if (!title.trim()) {
      setLocalError("Please enter an event name");
      return;
    }
    
    if (!startTime) {
      setLocalError("Please select a start time");
      return;
    }
    
    if (!endTime) {
      setLocalError("Please select an end time");
      return;
    }
    
    if (endTime <= startTime) {
      setLocalError("End time must be later than start time");
      return;
    }

    // All validation passed
    onSave({ title, role, startTime, endTime });
    setLocalError("");
  };

  // Min time for end time input based on start time
  const getMinEndTime = () => {
    if (!startTime) return "";
    
    // Get the next valid time after startTime
    const [hours, minutes] = startTime.split(':').map(Number);
    let newMinutes = minutes + 1;
    let newHours = hours;
    
    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours += 1;
    }
    
    if (newHours >= 24) {
      newHours = 23;
      newMinutes = 59;
    }
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
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
        
        {/* Error message display */}
        {(errorMessage || localError) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {errorMessage || localError}
          </div>
        )}
        
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

          {/* Start Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Start Time</label>
            <input
              type="time"
              className="w-full p-3 bg-white border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          {/* End Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">End Time</label>
            <input
              type="time"
              className="w-full p-3 bg-white border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={getMinEndTime()} // Set minimum time based on start time
              disabled={!startTime} // Disable until start time is selected
            />
            {startTime && (
              <p className="text-xs text-gray-500 mt-1">
                Minimum end time: {getMinEndTime()}
              </p>
            )}
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