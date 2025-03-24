import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarStyles from "./CalendarFiles";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";  
import CustomToolbar from "./CustomToolbar";
import axios from "axios";
import EventModal from "./EventModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useParams } from "react-router-dom";


const localizer = momentLocalizer(moment);


const DnDCalendar = withDragAndDrop(Calendar);

const Cra = () => {

  const [events, setEvents] = useState([]); 
  const [animateEvent, setAnimateEvent] = useState(null); 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTip, setShowTip] = useState(true); 
  const [loading, setLoading] = useState(true); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [eventToDelete, setEventToDelete] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);


  useEffect(() => {
    console.log('Room ID:', roomId); // Log the roomId to check if it's coming correctly
  
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/events/${roomId}`);
        setRoomDetails(response.data); 
        console.log(response)
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
  
    const fetchEvents = async () => { 
      try {
        const response = await axios.get(`http://localhost:5000/api/events/events/${roomId}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (roomId) {
      fetchRoomDetails();
      fetchEvents();
    }
  
  }, [roomId]);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!roomDetails) {
    return <div>Room not found</div>; 
  }

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setErrorMessage("");
    setModalOpen(true);
  };

  const isTimeOverlapping = (newStart, newEnd, existingEvents, excludeEventId = null) => {
    return existingEvents.some(existingEvent => {
    
      if (excludeEventId && existingEvent._id === excludeEventId) return false;
      
 
      const eventStart = new Date(existingEvent.start);
      const eventEnd = new Date(existingEvent.end);
      

      return (newStart < eventEnd && newEnd > eventStart);
    });
  };

  const handleSaveEvent = async ({ title, role, startTime, endTime }) => {
    setModalOpen(false);
  
    // Assuming user is authenticated
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser.userId || storedUser._id : null;
    if (!userId) return;
  
    if (!title || !role || !startTime || !endTime || !selectedSlot) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    const selectedDate = moment(selectedSlot.start).format("YYYY-MM-DD");
    const startDateTime = moment(`${selectedDate} ${startTime}`, "YYYY-MM-DD HH:mm").toDate();
    const endDateTime = moment(`${selectedDate} ${endTime}`, "YYYY-MM-DD HH:mm").toDate();
  
    if (endDateTime <= startDateTime) {
      setErrorMessage("End time must be later than start time.");
      return;
    }
  
    if (isTimeOverlapping(startDateTime, endDateTime, events)) {
      setErrorMessage("This time slot overlaps with an existing booking.");
      return;
    }
  
    const newEvent = {
      title: `${title} - ${role}`,
      start: startDateTime,
      end: endDateTime,
      userId,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/events/events/${roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
  
      if (!response.ok) throw new Error("Failed to create event");
  
      const createdEvent = await response.json();
  
      // Add the new event to state after successful creation
      setEvents((prev) => [...prev, createdEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  

  const onEventDrop = async ({ event, start, end }) => {

    if (isTimeOverlapping(start, end, events, event._id)) {
      alert("This time slot overlaps with an existing booking. Please select a different time.");
      return;
    }

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
  
  const handleDeleteEvent = (event) => {
    setEventToDelete(event);  
    setDeleteModalOpen(true); 
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to delete event");
  
      setEvents((prev) => {
        const updatedEvents = prev.filter((e) => e._id !== eventId);
        localStorage.setItem("events", JSON.stringify(updatedEvents)); // Remove from localStorage
        return updatedEvents;
      });
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  return (
    <div className="p-6 bg-black text-white min-h-screen transition-all duration-500 ease-in-out">
      <h1 className="animate-pulse text-3xl font-bold mb-6 text-white transition-all duration-300 hover:text-gray-300">
        Meeting Room Scheduler
      </h1>

      {errorMessage && (
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
)}


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
          onSelectEvent={handleDeleteEvent} 
          style={{ height: 600 }}
          draggableAccessor={() => true}
          className="animate-fade-in"
          eventPropGetter={(event) => ({
            className: `${animateEvent === event._id ? "event-delete" : ""}`,
            style: { backgroundColor: "#ffffff", color: "#000000" }
          })}
          dayPropGetter={(date) => {
            const today = new Date();
           
            const dateStr = moment(date).format("YYYY-MM-DD");
            const hasEvent = events.some(event => 
              moment(event.start).format("YYYY-MM-DD") === dateStr
            );
            
            return {
              className: today.toDateString() === date.toDateString() 
                ? "today-highlight" 
                : hasEvent ? "has-event" : "",
              style: hasEvent ? { backgroundColor: "rgba(255, 255, 255, 0.1)" } : {}
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
    <EventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveEvent} />

      </div>
      
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={deleteEvent}
        event={eventToDelete}
      />

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
      {showTip && (
        <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg animate-slide-in max-w-xs">
          <p className="font-bold">Quick Tip</p>
          <p className="text-sm">The system prevents booking overlapping time slots. You cannot schedule an event during a time that is already booked.</p>
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