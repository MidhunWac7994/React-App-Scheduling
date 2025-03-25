import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);


export const useEvents = (roomId) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    roomId ? `https://backend-scheduling-vvbm.onrender.com/api/events/events/${roomId}` : null,
    fetcher
  );


  const events = data ? data.filter(event => event.roomId === roomId) : [];


  const isTimeOverlapping = (newStart, newEnd, excludeEventId = null) => {
    return events.some(existingEvent => {
      if (excludeEventId && existingEvent._id === excludeEventId) return false;
      
      const eventStart = new Date(existingEvent.start);
      const eventEnd = new Date(existingEvent.end);
      
      return (newStart < eventEnd && newEnd > eventStart);
    });
  };

  const createEvent = async (newEvent) => {
    try {
      const response = await fetch(`https://backend-scheduling-vvbm.onrender.com/api/events/events/${roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) throw new Error("Failed to create event");

      await mutate();
      return { success: true };
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Failed to create the event. Please try again.");
      return { success: false, error };
    }
  };


  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`https://backend-scheduling-vvbm.onrender.com/api/api/events/${updatedEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error("Failed to update event");

      await mutate();
      return { success: true };
    } catch (error) {
      console.error("Error updating event:", error);
      setErrorMessage("Failed to update the event. Please try again.");
      return { success: false, error };
    }
  };


  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`https://backend-scheduling-vvbm.onrender.com/api/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete event");


      await mutate();
      return { success: true };
    } catch (error) {
      console.error("Error deleting event:", error);
      setErrorMessage("Failed to delete the event. Please try again.");
      return { success: false, error };
    }
  };

  return {
    events,
    isLoadingEvents: isLoading,
    isErrorEvents: error,
    errorMessage,
    setErrorMessage,
    isTimeOverlapping,
    createEvent,
    updateEvent,
    deleteEvent
  };
};