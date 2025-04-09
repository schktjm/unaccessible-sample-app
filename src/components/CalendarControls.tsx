import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarControlsProps {
  currentDate: string;
  currentView: string;
  onViewChange: (view: "day" | "week" | "month") => void;
}

export const CalendarControls = ({
  currentDate,
  currentView,
  onViewChange,
}: CalendarControlsProps) => {
  return (
    <div className="flex items-center justify-between py-4 px-4 pr-4 border-b border-white/20">
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Today
        </button>
        <div className="flex">
          <button className="p-2 text-white hover:bg-white/10 rounded-l-md">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="p-2 text-white hover:bg-white/10 rounded-r-md">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <h2 className="text-xl font-semibold text-white">{currentDate}</h2>
      </div>

      <div className="flex items-center gap-2 rounded-md p-1">
        <button
          onClick={() => onViewChange("day")}
          className={`px-3 py-1 rounded ${
            currentView === "day" ? "bg-white/20" : ""
          } text-white text-sm`}
        >
          Day
        </button>
        <button
          onClick={() => onViewChange("week")}
          className={`px-3 py-1 rounded ${
            currentView === "week" ? "bg-white/20" : ""
          } text-white text-sm`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange("month")}
          className={`px-3 py-1 rounded ${
            currentView === "month" ? "bg-white/20" : ""
          } text-white text-sm`}
        >
          Month
        </button>
      </div>
    </div>
  );
};
