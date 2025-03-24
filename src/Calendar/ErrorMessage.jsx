import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div 
      className="bg-red-500 text-white p-4 mb-4 rounded-md shadow-md transform transition-all duration-500 ease-in-out"
      role="alert"
    >
      <div className="flex items-center">
        <svg 
          className="w-5 h-5 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01m-6.938 3.225A9.96 9.96 0 0112 3a9.96 9.96 0 016.938 12.225m-6.938-2.75V12m0 0v-4m0 0h.01" />
        </svg>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;