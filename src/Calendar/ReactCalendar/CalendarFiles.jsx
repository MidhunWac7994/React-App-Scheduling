import React from "react";

const CalendarStyles = () => {
  return (
    <style jsx global>{`
      /* Calendar container */
      .rbc-calendar {
        background-color: #000000;
        border-radius: 0.5rem;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
      }
      
      /* Headers */
      .rbc-header {
        background-color: #000000;
        color: #ffffff;
        padding: 10px 0;
        font-weight: 500;
        border-bottom: 1px solid #333333;
      }
      
      /* Day cells */
      .rbc-date-cell {
        color: #ffffff;
        padding: 5px 8px;
        font-weight: 400;
      }
      
      /* Off-range days */
      .rbc-off-range {
        color: #666666;
      }
      
      /* Today's cell */
      .rbc-today {
        background-color: rgba(255, 255, 255, 0.05);
      }
      
      /* Month view */
      .rbc-month-view, .rbc-time-view {
        border: 1px solid #333333;
        background-color: #000000;
      }
      
      .rbc-month-row, .rbc-time-header, .rbc-time-content, .rbc-day-slot, .rbc-timeslot-group {
        border-color: #333333;
      }
      
      /* Events */
      .rbc-event {
        background-color: #ffffff;
        color: #000000;
        border-radius: 4px;
        border: none;
        padding: 4px 8px;
        transition: all 0.3s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }
      
      .rbc-event:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .rbc-event.event-highlight {
        animation: pulse 1s;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);
      }
      
      .rbc-event.event-delete {
        animation: fadeOut 0.3s;
        opacity: 0;
      }
      
      /* Toolbar */
      .rbc-toolbar {
        margin-bottom: 20px;
        padding: 10px;
        background-color: #000000;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      
      @media (max-width: 640px) {
        .rbc-toolbar {
          flex-direction: column;
          gap: 10px;
        }
      }
      
      .rbc-toolbar button {
        color: #ffffff;
        background-color: #000000;
        border: 1px solid #333333;
        transition: all 0.2s ease;
        padding: 8px 12px;
        margin: 0 2px;
      }
      
      .rbc-toolbar button:hover {
        background-color: #333333;
      }
      
      .rbc-toolbar button.rbc-active {
        background-color: #ffffff;
        color: #000000;
      }
      
      .rbc-toolbar-label {
        font-weight: 600;
        font-size: 1.1rem;
      }
      
      /* Time indicators */
      .rbc-time-gutter, .rbc-label {
        color: #ffffff;
      }
      
      /* Animation keyframes */
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
      }
      
      @keyframes fadeOut {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.8); }
      }
      
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideIn {
        0% { transform: translateX(-20px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
      
      .animate-slide-in {
        animation: slideIn 0.5s ease-out;
      }
      
      .animate-flash {
        animation: flash 2s infinite;
      }
      
      /* Today highlight */
      .today-highlight {
        position: relative;
      }
      
      .today-highlight::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid #ffffff;
        pointer-events: none;
        animation: pulse 2s infinite;
      }
      
      /* Ensure toolbar buttons align properly */
      .rbc-btn-group {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      
      /* Ensure event content is visible */
      .rbc-event-content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
  );
};

export default CalendarStyles;