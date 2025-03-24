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
  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      date={currentDate}
      onNavigate={setCurrentDate}
      selectable
      resizable
      onEventDrop={handleEventDrop}
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
  );
};

export default CalendarComponent;