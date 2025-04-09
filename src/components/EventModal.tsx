import { Clock, MapPin, Calendar, Users, X } from "lucide-react";
import { Event } from "./WeekView";

interface EventModalProps {
  event: Event;
  weekDays: string[];
  weekDates: number[];
  currentMonth: string;
  onClose: () => void;
}

export const EventModal = ({
  event,
  weekDays,
  weekDates,
  currentMonth,
  onClose,
}: EventModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        className={`${event.color} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3 text-white">
          <p className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            {`${event.startTime} - ${event.endTime}`}
          </p>
          <p className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            {event.location}
          </p>
          <p className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {`${weekDays[event.day - 1]}, ${
              weekDates[event.day - 1]
            } ${currentMonth}`}
          </p>
          <p className="flex items-start">
            <Users className="mr-2 h-5 w-5 mt-1" />
            <span>
              <strong>Attendees:</strong>
              <br />
              {event.attendees.join(", ") || "No attendees"}
            </span>
          </p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
