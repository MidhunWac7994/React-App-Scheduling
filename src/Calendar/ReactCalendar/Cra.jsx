import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarStyles from "./CalendarFiles";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";  
import CustomToolbar from "./CustomToolbar";
import axios from "axios";

// Set up moment localizer for date formatting
const localizer = momentLocalizer(moment);

// Add drag and drop functionality to the calendar
const DnDCalendar = withDragAndDrop(Calendar);

const Cra = () => {
  // State management
  const [events, setEvents] = useState([]); // Stores all calendar events
  const [animateEvent, setAnimateEvent] = useState(null); // For animation effects
  const [currentDate, setCurrentDate] = useState(new Date()); // Current view date
  const [showTip, setShowTip] = useState(true); // Controls quick tip visibility
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch events from API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Handle creating new events
  const handleSelectSlot = async (slotInfo) => {
    const title = window.prompt("Enter event title:");
    const designation = window.prompt("Enter designation:");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser.userId || storedUser._id : null;

    if (!userId) {
      alert("User not found. Please log in again.");
      return;
    }

    if (title && designation) {
      const newEvent = {
        title: `${title} - ${designation}`,
        start: slotInfo.start,
        end: moment(slotInfo.start).add(1, "hour").toDate(),
        userId,
      };

      try {
        const response = await fetch("http://localhost:5000/api/events/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });

        if (!response.ok) throw new Error("Failed to create event");

        const createdEvent = await response.json();
        setEvents((prev) => [...prev, createdEvent]);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  };

  // Handle event dragging and dropping
  const onEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };

    try {
      const response = await fetch(`http://localhost:5000/api/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error("Failed to update event");

      setEvents((prev) =>
        prev.map((e) => (e._id === event._id ? updatedEvent : e))
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Delete this event?")) {
      setAnimateEvent(eventId);

      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete event");

        setTimeout(() => {
          setEvents((prev) => prev.filter((e) => e._id !== eventId));
        }, 300);
      } catch (error) {
        console.error("Error deleting event:", error);
      }  const [modalOpen, setModalOpen] = useState(false);  // Modal state
  const [selectedSlot, setSelectedSlot] = useState(null); // Store slot info
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen transition-all duration-500 ease-in-out">
      <h1 className="animate-pulse text-3xl font-bold mb-6 text-white transition-all duration-300 hover:text-gray-300">
        Meeting Room Scheduler
      </h1>


      <div className="bg-black p-6 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 hover:shadow-white hover:shadow-sm">
        <CalendarStyles />

        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={setCurrentDate}
          selectable
          resizable
          onEventDrop={onEventDrop}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => handleDeleteEvent(event._id)}
          style={{ height: 600 }}
          draggableAccessor={() => true}
          className="animate-fade-in"
          eventPropGetter={(event) => ({
            className: `${animateEvent === event._id ? "event-delete" : ""}`,
            style: { backgroundColor: "#ffffff", color: "#000000" }
          })}
          dayPropGetter={(date) => {
            const today = new Date();
            return {
              className: today.toDateString() === date.toDateString() ? "today-highlight" : "",
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

      {/* Quick Tip */}
              {/* Quick Guide Section */}
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
                    <p className="text-sm text-white font-medium">Navigate</p>
                    <p className="text-xs text-gray-400">Use the toolbar to switch views</p>
                  </div>
                </div>
              </div>
      {showTip && (
        <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg animate-slide-in max-w-xs">
          <p className="font-bold">Quick Tip</p>
          <p className="text-sm">Drag and drop events to reschedule them instantly.</p>
          <button 
            className="mt-2 text-xs underline hover:no-underline" 
            onClick={() => setShowTip(false)}
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

export default Cra;