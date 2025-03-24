import React from "react";

const QuickTip = ({ showTip, setShowTip }) => {
  if (!showTip) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg animate-slide-in max-w-xs">
      <p className="font-bold">Quick Tip</p>
      <p className="text-sm">
        The system prevents booking overlapping time slots. You cannot schedule an event during a time that is already booked.
      </p>
      <button 
        className="mt-2 text-xs underline hover:no-underline" 
        onClick={() => setShowTip(false)}
      >
        Got it
      </button>
    </div>
  );
};

export default QuickTip;