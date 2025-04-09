import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface Calendar {
  name: string;
  color: string;
}

interface SidebarProps {
  isLoaded: boolean;
  currentMonth: string;
  miniCalendarDays: (number | null)[];
  myCalendars: Calendar[];
  isVisible: boolean;
}

export const Sidebar = ({
  isLoaded,
  currentMonth,
  miniCalendarDays,
  myCalendars,
  isVisible,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-white/10 backdrop-blur-lg p-4 shadow-xl border-r border-white/20 rounded-tr-3xl transition-transform duration-300 z-10 ${
        isLoaded ? "animate-fade-in" : ""
      } flex flex-col justify-between ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ animationDelay: "0.4s" }}
    >
      <div>
        <button className="mb-6 flex items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-white w-full">
          <Plus className="h-5 w-5" />
          <span>作成</span>
        </button>

        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">{currentMonth}</h3>
            <div className="flex gap-1">
              <button className="p-1 rounded-full hover:bg-white/20">
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
              <button className="p-1 rounded-full hover:bg-white/20">
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-xs text-white/70 font-medium py-1">
                {day}
              </div>
            ))}

            {miniCalendarDays.map((day, i) => (
              <div
                key={i}
                className={`text-xs rounded-full w-7 h-7 flex items-center justify-center ${
                  day === 5
                    ? "bg-blue-500 text-white"
                    : "text-white hover:bg-white/20"
                } ${!day ? "invisible" : ""}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* My Calendars */}
        <div>
          <h3 className="text-white font-medium mb-3">My calendars</h3>
          <div className="space-y-2">
            {myCalendars.map((cal, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                <span className="text-white text-sm">{cal.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New position for the big plus button */}
      <button className="mt-6 flex items-center justify-center gap-2 rounded-full bg-blue-500 p-4 text-white w-14 h-14 self-start">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};
