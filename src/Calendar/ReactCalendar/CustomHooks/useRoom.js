import useSWR from "swr";
import api from "../../../api";

const fetcher = (url) => api.get(url).then((res) => res.data);

export const useRoom = (roomId) => {
  const {
    data: roomDetails,
    error,
    isLoading,
  } = useSWR(roomId ? `/events/${roomId}` : null, fetcher);

  return {
    roomDetails,
    isLoadingRoom: isLoading,
    isErrorRoom: error,
  };
};
