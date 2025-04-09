import { Tooltip } from "./Tooltip";
import { Event } from "./WeekView";

interface EventItemProps {
  event: Event;
  eventStyle: {
    top: string;
    height: string;
  };
  onClick: () => void;
}

export const EventItem = ({ event, eventStyle, onClick }: EventItemProps) => {
  return (
    <div
      className={`absolute ${event.color} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg`}
      style={{
        ...eventStyle,
        left: "4px",
        right: "4px",
      }}
      onClick={onClick}
    >
      <div className="font-medium">{event.title}</div>
      <div className="opacity-80 text-[10px] mt-1">{`${event.startTime} - ${event.endTime}`}</div>
      <div className="opacity-80 text-[10px] mt-1">{event.location}</div>
      <Tooltip message={event.description}>
        <div className="opacity-80 text-[10px] mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {event.description}
        </div>
      </Tooltip>
    </div>
  );
};
