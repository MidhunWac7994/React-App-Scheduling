  import React, { useState, useEffect } from "react";
  import { Calendar, momentLocalizer } from "react-big-calendar";
  import moment from "moment";
  import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
  import "react-big-calendar/lib/css/react-big-calendar.css";
  import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
  import CalendarStyles from "./CalendarFiles";
  import CustomToolbar from "./CustomToolbar";

  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);

  export default function ReactCalendar() {
    const [events, setEvents] = useState([
      {
        id: 1,
        title: "Meeting - Project Manager",
        start: moment("2025-03-15T10:00:00").toDate(),
        end: moment("2025-03-15T11:00:00").toDate(),
      },
    ]);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [isLoading, setIsLoading] = useState(true);
    const [animateEvent, setAnimateEvent] = useState(null);
    const [showTip, setShowTip] = useState(false);

    // Loading animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }, []);

    // Show tip animation
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowTip(true);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    const onEventDrop = ({ event, start, end }) => {
      setAnimateEvent(event.id);
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? { ...e, start, end } : e))
      );
      setTimeout(() => setAnimateEvent(null), 1000);
    };

    const handleSelectSlot = (slotInfo) => {
      const title = window.prompt("Enter event title:");
      const designation = window.prompt("Enter designation (e.g., Developer, Manager):");
      if (title && designation) {
        const newEvent = {
          id: Date.now(),
          title: `${title} - ${designation}`,
          start: slotInfo.start,
          end: moment(slotInfo.start).add(1, "hour").toDate(),
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setAnimateEvent(newEvent.id);
        setTimeout(() => setAnimateEvent(null), 1000);
      }
    };

    const handleDeleteEvent = (eventId) => {
      if (window.confirm("Delete this event?")) {
        setAnimateEvent(eventId);
        setTimeout(() => {
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        }, 300);
      }
    };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      );
    }

    return (
      <div className="p-6 bg-black text-white min-h-screen transition-all duration-500 ease-in-out">
        <span className="animate-pulse text-3xl font-bold mb-6 text-white transition-all duration-300 hover:text-gray-300">
          Meeting Room Scheduler
        </span><br />
        
        <div className="bg-black p-6 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 hover:shadow-white hover:shadow-sm">
          <CalendarStyles />
          
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            selectable
            resizable
            onEventDrop={onEventDrop}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => handleDeleteEvent(event.id)}
            style={{ height: 600 }}
            className="animate-fade-in"
            eventPropGetter={(event) => ({
              className: `${animateEvent === event.id ? (
                events.some(e => e.id === event.id) ? 'event-highlight' : 'event-delete'
              ) : ''}`,
              style: {
                backgroundColor: '#ffffff',
                color: '#000000'
              }
            })}
            dayPropGetter={(date) => {
              const today = new Date();
              const isToday = date.getDate() === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear();
              
              return {
                className: isToday ? 'today-highlight' : '',
                style: {}
              };
            }}
            components={{
              toolbar: CustomToolbar,
              event: ({ event }) => (
                <div className="overflow-hidden w-full h-full">
                  <p className="font-medium text-xs md:text-sm truncate">{event.title}</p>
                </div>
              )
            }}
          />
        </div>

        {showTip && (
          <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg animate-slide-in max-w-xs">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-bold">Quick Tip</p>
            </div>
            <p className="text-sm">Drag and drop events to reschedule them instantly.</p>
            <button 
              className="mt-2 text-xs underline hover:no-underline"
              onClick={() => setShowTip(false)}
            >
              Got it
            </button>
          </div>
        )}
        
        <div className="mt-8 p-6 bg-black rounded-lg border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-white hover:shadow-sm animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="animate-pulse">Quick Guide</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
              <div className="p-2 bg-white rounded-full">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Add Meeting</p>
                <p className="text-xs text-gray-400">Click on an empty time slot</p>
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
                <p className="text-xs text-gray-400">Drag and drop an event</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-900 p-3 rounded-lg hover:scale-105">
              <div className="p-2 bg-white rounded-full">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Resize</p>
                <p className="text-xs text-gray-400">Drag the bottom of an event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }