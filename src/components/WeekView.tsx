import { EventItem } from "./EventItem";

export interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  day: number;
  description: string;
  location: string;
  attendees: string[];
  organizer: string;
}

interface WeekViewProps {
  events: Event[];
  weekDays: string[];
  weekDates: number[];
  timeSlots: number[];
  onEventClick: (event: Event) => void;
}

export const WeekView = ({
  events,
  weekDays,
  weekDates,
  timeSlots,
  onEventClick,
}: WeekViewProps) => {
  const calculateEventStyle = (startTime: string, endTime: string) => {
    const start =
      Number.parseInt(startTime.split(":")[0]) +
      Number.parseInt(startTime.split(":")[1]) / 60;
    const end =
      Number.parseInt(endTime.split(":")[0]) +
      Number.parseInt(endTime.split(":")[1]) / 60;
    const top = (start - 8) * 80; // 80px per hour
    const height = (end - start) * 80;
    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <div className="flex-1 overflow-auto  px-4 py-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-white/20">
          <div className="p-2 text-center text-white/50 text-xs"></div>
          {weekDays.map((day, i) => (
            <div key={i} className="p-2 text-center border-l border-white/20">
              <div className="text-xs text-white/70 font-medium">{day}</div>
              <div
                className={`text-lg font-medium mt-1 text-white ${
                  weekDates[i] === 5
                    ? "bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                    : ""
                }`}
              >
                {weekDates[i]}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid grid-cols-8">
          {/* Time Labels */}
          <div className="text-white/70">
            {timeSlots.map((time, i) => (
              <div
                key={i}
                className="h-20 border-b border-white/10 pr-2 text-right text-xs"
              >
                {time > 12 ? `${time - 12} PM` : `${time} AM`}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="border-l border-white/20 relative">
              {timeSlots.map((_, timeIndex) => (
                <div
                  key={timeIndex}
                  className="h-20 border-b border-white/10"
                ></div>
              ))}

              {/* Events */}
              {events
                .filter((event) => event.day === dayIndex + 1)
                .map((event, i) => {
                  const eventStyle = calculateEventStyle(
                    event.startTime,
                    event.endTime
                  );
                  return (
                    <EventItem
                      key={i}
                      event={event}
                      eventStyle={eventStyle}
                      onClick={() => onEventClick(event)}
                    />
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
