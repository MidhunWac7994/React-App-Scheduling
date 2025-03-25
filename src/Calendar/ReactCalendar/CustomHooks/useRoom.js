import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useRoom = (roomId) => {
  const {
    data: roomDetails,
    error,
    isLoading,
  } = useSWR(
    roomId ? `https://backend-scheduling-vvbm.onrender.com/events/${roomId}` : null,
    fetcher
  );

  return {
    roomDetails,
    isLoadingRoom: isLoading,
    isErrorRoom: error,
  };
};
