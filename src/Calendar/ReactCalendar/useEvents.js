import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useEvents = (roomId) => {
  const { data: events, mutate, error } = useSWR(
    roomId ? `http://localhost:5000/api/events/events/${roomId}` : null,
    fetcher
  );

  const addEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/events/${roomId}`,
        newEvent
      );
      mutate([...events, response.data], false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${updatedEvent._id}`,
        updatedEvent
      );
      mutate(
        events.map((e) => (e._id === updatedEvent._id ? updatedEvent : e)),
        false
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      mutate(events.filter((e) => e._id !== eventId), false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return { events, addEvent, updateEvent, deleteEvent, error };
};