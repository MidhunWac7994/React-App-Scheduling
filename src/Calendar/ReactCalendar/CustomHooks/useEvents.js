import { useState } from "react";
import useSWR from "swr";
import api from "../../../api";

const fetcher = (url) => api.get(url).then((res) => res.data);

export const useEvents = (roomId) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    roomId ? `/events/${roomId}` : null, // ✅ Correct API route
    fetcher
  );

  const events = data || [];

  const isTimeOverlapping = (newStart, newEnd, excludeEventId = null) => {
    return events.some((existingEvent) => {
      if (excludeEventId && existingEvent._id === excludeEventId) return false;
      const eventStart = new Date(existingEvent.start);
      const eventEnd = new Date(existingEvent.end);
      return newStart < eventEnd && newEnd > eventStart;
    });
  };

  const createEvent = async (newEvent) => {
    try {
      await api.post(`/events/${roomId}`, newEvent); // ✅ roomId is required in POST
      await mutate();
      return { success: true };
    } catch (error) {
      console.error("Error creating event:", error?.response?.data || error);
      setErrorMessage(error?.response?.data?.message || "Failed to create the event. Please try again.");
      return { success: false, error };
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/${eventId}`); // ✅ Matches backend DELETE route
      await mutate();
      return { success: true };
    } catch (error) {
      console.error("Error deleting event:", error?.response?.data || error);
      setErrorMessage(error?.response?.data?.message || "Failed to delete the event. Please try again.");
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
    deleteEvent,
  };
};
