import React from "react";

function CustomToolbar(toolbar) {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const viewLabels = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda'
  };

  return (
    <div className="rbc-toolbar">
      <div className="flex space-x-1">
        <button
          onClick={goToCurrent}
          className="transition-all duration-200 hover:scale-105 border border-white px-3 py-1 rounded hover:bg-white hover:text-black"
        >
          Today
        </button>
        <div className="flex space-x-1">
          <button
            onClick={goToBack}
            className="transition-all duration-200 hover:scale-105 border border-white px-3 py-1 rounded hover:bg-white hover:text-black"
          >
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="transition-all duration-200 hover:scale-105 border border-white px-3 py-1 rounded hover:bg-white hover:text-black"
          >
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <span className="rbc-toolbar-label">
        {toolbar.label}
      </span>
      
      <div className="rbc-btn-group">
        {toolbar.views.map(view => (
          <button
            key={view}
            onClick={() => toolbar.onView(view)}
            className={`transition-transform duration-200 border border-white px-3 py-1 rounded hover:scale-105 ${
              toolbar.view === view 
                ? 'bg-white text-black' 
                : 'bg-black text-white hover:bg-white hover:text-black'
            }`}
          >
            {viewLabels[view] || view}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomToolbar;