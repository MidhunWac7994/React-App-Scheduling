import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import CustomToolbar from "./CustomToolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({
  events,
  currentDate,
  setCurrentDate,
  handleSelectSlot,
  handleDeleteEvent,
  handleEventDrop,
  animateEvent
}) => {
  const [view, setView] = React.useState("month");

  return (
    <DnDCalendar
      localizer={localizer}
      events={events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))}
      startAccessor="start"
      endAccessor="end"
      date={currentDate}
      onNavigate={setCurrentDate}
      view={view}
      onView={setView}
      selectable
      resizable
      onEventDrop={handleEventDrop}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleDeleteEvent}
      style={{ height: 600 }}
      draggableAccessor={() => true}
      className="animate-fade-in"
      components={{
        toolbar: CustomToolbar,
      }}
    />
  );
};

export default CalendarComponent;