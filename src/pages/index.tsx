import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CalendarControls } from "../components/CalendarControls";
import { WeekView, Event } from "../components/WeekView";
import { EventModal } from "../components/EventModal";
import { AIPopup } from "../components/AIPopup";
import {
  EventCreateModal,
  EventFormData,
} from "../components/EventCreateModal";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Show AI popup after 3 seconds
    const popupTimer = setTimeout(() => {
      setShowAIPopup(true);
    }, 3000);

    // サンプルイベントをセット
    setEvents(sampleEvents);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  useEffect(() => {
    if (showAIPopup) {
      const text =
        "LLooks like you don't have that many meetings today. Shall I play some Hans Zimmer essentials to help you get into your Flow State?";
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [showAIPopup]);

  const [currentView, setCurrentView] = useState("week");
  const [currentMonth, setCurrentMonth] = useState("March 2025");
  const [currentDate, setCurrentDate] = useState("March 5");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowCreateModal(false);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Sample calendar events
  const sampleEvents = [
    {
      id: 1,
      title: "チームミーティング",
      startTime: "09:00",
      endTime: "10:00",
      color: "bg-blue-500",
      day: 1,
      description: "Weekly team sync-up",
      location: "Conference Room A",
      attendees: ["John Doe", "Jane Smith", "Bob Johnson"],
      organizer: "Alice Brown",
    },
    {
      id: 2,
      title: "ランチミーティング",
      startTime: "12:30",
      endTime: "13:30",
      color: "bg-green-500",
      day: 1,
      description: "プロジェクトの進捗について話し合います",
      location: "Cafe Nero",
      attendees: ["Sarah Lee"],
      organizer: "You",
    },
    {
      id: 3,
      title: "スプリントレビュー",
      startTime: "14:00",
      endTime: "15:30",
      color: "bg-purple-500",
      day: 3,
      description: "Q2プロジェクトの進捗レビュー",
      location: "Meeting Room 3",
      attendees: ["Team Alpha", "Stakeholders"],
      organizer: "Project Manager",
    },
    {
      id: 4,
      title: "クォーターリーレビュー",
      startTime: "10:00",
      endTime: "11:00",
      color: "bg-yellow-500",
      day: 2,
      description: "主要クライアントとの四半期レビュー",
      location: "Zoom Meeting",
      attendees: ["Client Team", "Sales Team"],
      organizer: "Account Manager",
    },
    {
      id: 5,
      title: "アイデアセッション",
      startTime: "13:00",
      endTime: "14:30",
      color: "bg-indigo-500",
      day: 4,
      description: "新機能のアイデア出し",
      location: "Creative Space",
      attendees: ["Product Team", "Design Team"],
      organizer: "Product Owner",
    },
    {
      id: 6,
      title: "デモ",
      startTime: "11:00",
      endTime: "12:00",
      color: "bg-pink-500",
      day: 5,
      description: "新機能のデモンストレーション",
      location: "Demo Room",
      attendees: ["Stakeholders", "Dev Team"],
      organizer: "Tech Lead",
    },
    {
      id: 7,
      title: "マーケティング戦略",
      startTime: "13:00",
      endTime: "14:00",
      color: "bg-teal-500",
      day: 6,
      description: "Q3マーケティング戦略の検討",
      location: "Marketing Office",
      attendees: ["Marketing Team"],
      organizer: "Marketing Director",
    },
    {
      id: 8,
      title: "プルリクエストレビュー",
      startTime: "15:00",
      endTime: "16:00",
      color: "bg-cyan-500",
      day: 7,
      description: "新機能のプルリクエストレビュー",
      location: "Dev Area",
      attendees: ["Dev Team"],
      organizer: "Senior Developer",
    },
    {
      id: 9,
      title: "デイリースクラム",
      startTime: "08:30",
      endTime: "09:30",
      color: "bg-blue-400",
      day: 2,
      description: "デイリーチームスタンドアップ",
      location: "Slack Huddle",
      attendees: ["Development Team"],
      organizer: "Scrum Master",
    },
    {
      id: 10,
      title: "UIデザイン",
      startTime: "14:30",
      endTime: "15:45",
      color: "bg-purple-400",
      day: 5,
      description: "新UIデザインのレビュー",
      location: "Design Lab",
      attendees: ["UX Team", "Product Manager"],
      organizer: "Lead Designer",
    },
    {
      id: 11,
      title: "投資家アップデート",
      startTime: "10:30",
      endTime: "12:00",
      color: "bg-red-400",
      day: 7,
      description: "四半期の投資家アップデート",
      location: "Board Room",
      attendees: ["Executive Team", "Investors"],
      organizer: "CEO",
    },
    {
      id: 12,
      title: "新ツールオンボーディング",
      startTime: "09:30",
      endTime: "11:30",
      color: "bg-green-400",
      day: 4,
      description: "新ツールのオンボーディングセッション",
      location: "Training Room",
      attendees: ["All Departments"],
      organizer: "HR",
    },
    {
      id: 13,
      title: "予算分析",
      startTime: "13:30",
      endTime: "15:00",
      color: "bg-yellow-400",
      day: 3,
      description: "四半期の予算分析",
      location: "Finance Office",
      attendees: ["Finance Team", "Department Heads"],
      organizer: "CFO",
    },
    {
      id: 14,
      title: "プロジェクト提案",
      startTime: "11:00",
      endTime: "12:30",
      color: "bg-orange-400",
      day: 6,
      description: "新規プロジェクトの提案",
      location: "Client Office",
      attendees: ["Sales Team", "Client Representatives"],
      organizer: "Account Executive",
    },
    {
      id: 15,
      title: "ロードマップディスカッション",
      startTime: "14:00",
      endTime: "15:30",
      color: "bg-pink-400",
      day: 1,
      description: "Q3のロードマップ検討",
      location: "Strategy Room",
      attendees: ["Product Team", "Engineering Leads"],
      organizer: "Product Manager",
    },
  ];

  // Sample calendar days for the week view
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekDates = [3, 4, 5, 6, 7, 8, 9];
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8); // 8 AM to 4 PM

  // Sample calendar for mini calendar
  const daysInMonth = 31;
  const firstDayOffset = 5;
  const miniCalendarDays = Array.from(
    { length: daysInMonth + firstDayOffset },
    (_, i) => (i < firstDayOffset ? null : i - firstDayOffset + 1)
  );

  // Sample my calendars
  const myCalendars = [
    { name: "My Calendar", color: "bg-blue-500" },
    { name: "Work", color: "bg-green-500" },
    { name: "Personal", color: "bg-purple-500" },
    { name: "Family", color: "bg-orange-500" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"
        fill
        className="object-cover"
        priority
      />

      <Header isLoaded={isLoaded} onMenuClick={toggleSidebar} />

      {/* Main Content */}
      <main className="relative h-screen w-full pt-20 flex">
        <Sidebar
          isLoaded={isLoaded}
          currentMonth={currentMonth}
          miniCalendarDays={miniCalendarDays}
          myCalendars={myCalendars}
          isVisible={isSidebarVisible}
          onCreateButtonClick={handleOpenCreateModal}
        />

        {/* Calendar View */}
        <div
          className={`flex-1 flex flex-col transition-[margin] duration-300 ${
            isLoaded ? "animate-fade-in" : ""
          } ${isSidebarVisible ? "ml-64" : "ml-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <CalendarControls
            currentDate={currentDate}
            currentView={currentView}
            onViewChange={(view) => setCurrentView(view)}
          />

          <WeekView
            events={events}
            weekDays={weekDays}
            weekDates={weekDates}
            timeSlots={timeSlots}
            onEventClick={handleEventClick}
          />
        </div>
      </main>

      {showAIPopup && (
        <AIPopup
          typedText={typedText}
          isPlaying={isPlaying}
          onClose={() => setShowAIPopup(false)}
          onTogglePlay={togglePlay}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          weekDays={weekDays}
          weekDates={weekDates}
          currentMonth={currentMonth}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* イベント作成モーダル */}
      {showCreateModal && (
        <EventCreateModal
          weekDays={weekDays}
          weekDates={weekDates}
          currentMonth={currentMonth}
          onClose={handleCloseCreateModal}
          onSave={handleCreateEvent}
        />
      )}
    </div>
  );
}
