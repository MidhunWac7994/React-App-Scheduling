import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useRoom = (roomId) => {
  const {
    data: roomDetails,
    error,
    isLoading,
  } = useSWR(
    roomId ? `http://localhost:5000/api/events/events/${roomId}` : null,
    fetcher
  );

  return {
    roomDetails,
    isLoadingRoom: isLoading,
    isErrorRoom: error,
  };
};
