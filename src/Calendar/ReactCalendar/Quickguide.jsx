import React from "react";

const QuickGuide = () => {
  return (
    <>
      <h3 className="animate-pulse mb-4">
        <span className="animate-pulse">Quick Guide</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
          <div className="p-2 bg-white rounded-full">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white font-medium">Add Meeting</p>
            <p className="text-xs text-gray-400">Click on an empty time slot (no overlapping times allowed)</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
          <div className="p-2 bg-white rounded-full">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white font-medium">Cancel Meeting</p>
            <p className="text-xs text-gray-400">Click on an existing event</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
          <div className="p-2 bg-white rounded-full">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white font-medium">Reschedule</p>
            <p className="text-xs text-gray-400">Drag and drop an event (only to non-overlapping time slots)</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
          <div className="p-2 bg-white rounded-full">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white font-medium">Navigate</p>
            <p className="text-xs text-gray-400">Use the toolbar to switch views</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickGuide;