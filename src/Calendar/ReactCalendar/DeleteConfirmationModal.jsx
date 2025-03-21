import React, { useState } from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, event }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  if (!isOpen) return null;
  
  const handleDelete = () => {
    setIsDeleting(true);
    setShowAnimation(true);
    
    // Add a delay to show the animation before actually deleting
    setTimeout(() => {
      onDelete(event._id);
      setIsDeleting(false);
      setShowAnimation(false);
    }, 1500); // Animation takes 1.5 seconds
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-30 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-96 transform transition-all overflow-hidden">
        <div className="p-6">
          {showAnimation ? (
            <div className="flex flex-col items-center justify-center h-40">
              <div className="relative h-32 w-32">
                {/* Document */}
                <div className="absolute h-16 w-12 bg-yellow-100 border border-yellow-300 top-0 left-10 transform origin-bottom transition-all duration-1000 animate-wiggle"
                    style={{
                      animation: "wiggle 0.3s ease-in-out 2, moveToTrash 1s ease-in-out 0.6s forwards",
                    }}>
                  <div className="w-8 h-1 bg-gray-400 mx-auto mt-3"></div>
                  <div className="w-8 h-1 bg-gray-400 mx-auto mt-2"></div>
                  <div className="w-8 h-1 bg-gray-400 mx-auto mt-2"></div>
                </div>
                
                {/* Trash bin */}
                <div className="absolute bottom-0 left-8 flex flex-col items-center">
                  {/* Trash lid */}
                  <div className="w-16 h-2 bg-gray-700 dark:bg-gray-200 rounded-t-md transform transition-all duration-500"
                      style={{
                        animation: "openLid 0.3s ease-in-out 0.6s forwards, closeLid 0.3s ease-in-out 1.2s forwards"
                      }}></div>
                  
                  {/* Trash can */}
                  <div className="w-14 h-12 bg-gray-600 dark:bg-gray-300 rounded-b-md flex justify-center">
                    <div className="w-10 h-9 border-2 border-gray-700 dark:border-gray-400 border-t-0 mt-1"></div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Deleting event...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-5">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Delete Event
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Are you sure you want to delete "<span className="font-medium text-gray-900 dark:text-white">{event.title}</span>"?
                <br />
                <span className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  disabled={isDeleting}
                  className={`w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={onClose}
                >
                  Cancel
                </button>
                
                <button
                  disabled={isDeleting}
                  className={`w-full px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes moveToTrash {
          0% { transform: translateY(0) rotate(0deg); }
          60% { transform: translateY(20px) rotate(0deg); }
          100% { transform: translateY(60px) rotate(180deg) scale(0.5); opacity: 0; }
        }
        
        @keyframes openLid {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-60deg) translateY(-5px); }
        }
        
        @keyframes closeLid {
          0% { transform: rotateX(-60deg) translateY(-5px); }
          100% { transform: rotateX(0deg) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmationModal;