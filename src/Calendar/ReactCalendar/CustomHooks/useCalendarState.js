import { useState } from "react";
import moment from "moment";


export const useCalendarState = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTip, setShowTip] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [animateEvent, setAnimateEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setModalOpen(true);
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const closeEventModal = () => {
    setModalOpen(false);
    setSelectedSlot(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return {
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
  };
};