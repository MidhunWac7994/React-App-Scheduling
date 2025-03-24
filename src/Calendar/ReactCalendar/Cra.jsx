import React from "react";
import { useParams } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarStyles from "./CalendarFiles";
import EventModal from "./EventModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import moment from "moment";

// Custom hooks
import { useRoom } from "./CustomHooks/useRoom";
import { useEvents } from "./CustomHooks/useEvents";
import { useCalendarState } from "./CustomHooks/useCalendarState";
// Components
import CalendarComponent from "./CalendarComponent";
import QuickGuide from "./Quickguide";
import QuickTip from "./QuickTip";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
const Cra = () => {
  const { roomId } = useParams();
  
  // Custom hooks
  const { roomDetails, isLoadingRoom, isErrorRoom } = useRoom(roomId);
  const { 
    events, 
    isLoadingEvents, 
    errorMessage, 
    setErrorMessage, 
    isTimeOverlapping, 
    createEvent, 
    updateEvent, 
    deleteEvent 
  } = useEvents(roomId);
  
  const {
    currentDate,
    setCurrentDate,
    showTip,
    setShowTip,
    modalOpen,
    selectedSlot,
    deleteModalOpen,
    eventToDelete,
    animateEvent,
    handleSelectSlot,
    handleDeleteEvent,
    closeEventModal,
    closeDeleteModal
  } = useCalendarState();

  // Loading state
  if (isLoadingRoom || isLoadingEvents) {
    return <LoadingSpinner />;
  }

  // Error state
  if (isErrorRoom || !roomDetails) {
    return <div>Room not found</div>;
  }

  // Event handlers
  const handleSaveEvent = async ({ title, role, startTime, endTime }) => {
    closeEventModal();
  
    // Ensure user is authenticated
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser.userId || storedUser._id : null;
    if (!userId) {
      setErrorMessage("User authentication required");
      return;
    }
  
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
  
    if (isTimeOverlapping(startDateTime, endDateTime)) {
      setErrorMessage("This time slot overlaps with an existing booking.");
      return;
    }
  
    const newEvent = {
      title: `${title} - ${role}`,
      start: startDateTime,
      end: endDateTime,
      userId,
      roomId
    };
  
    await createEvent(newEvent);
  };

  const handleEventDrop = async ({ event, start, end }) => {
    if (isTimeOverlapping(start, end, event._id)) {
      setErrorMessage("This time slot overlaps with an existing booking. Please select a different time.");
      return;
    }

    const updatedEvent = { ...event, start, end, roomId };
    await updateEvent(updatedEvent);
  };

  const handleConfirmDelete = async (eventId) => {
    await deleteEvent(eventId);
    closeDeleteModal();
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen transition-all duration-500 ease-in-out">
      <h1 className="animate-pulse text-3xl font-bold mb-6 text-white transition-all duration-300 hover:text-gray-300">
        Meeting Room Scheduler
      </h1>

      <ErrorMessage errorMessage={errorMessage} />

      <div className="bg-black p-6 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 hover:shadow-white hover:shadow-sm">
        <CalendarStyles />

        <CalendarComponent 
          events={events}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          handleSelectSlot={handleSelectSlot}
          handleDeleteEvent={handleDeleteEvent}
          handleEventDrop={handleEventDrop}
          animateEvent={animateEvent}
        />
        
        <EventModal 
          isOpen={modalOpen} 
          onClose={closeEventModal} 
          onSave={handleSaveEvent} 
        />
      </div>
      
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleConfirmDelete}
        event={eventToDelete}
      />

      <QuickGuide />
      
      <QuickTip showTip={showTip} setShowTip={setShowTip} />
    </div>
  );
};

export default Cra;