import { Clock, MapPin, Calendar, Users, X, Save } from "lucide-react";
import { useState } from "react";

// イベントの型定義（WeekViewと同じ）
export interface EventFormData {
  id?: number;
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

interface EventCreateModalProps {
  weekDays: string[];
  weekDates: number[];
  currentMonth: string;
  onClose: () => void;
  onSave: (event: EventFormData) => void;
}

export const EventCreateModal = ({
  weekDays,
  weekDates,
  currentMonth,
  onClose,
  onSave,
}: EventCreateModalProps) => {
  const [eventData, setEventData] = useState<EventFormData>({
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-blue-500",
    day: new Date().getDay() || 7, // 現在の曜日（0は日曜日なので7に変換）
    description: "",
    location: "",
    attendees: [],
    organizer: "あなた",
  });

  const [attendeeInput, setAttendeeInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (color: string) => {
    setEventData((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleAttendeeAdd = () => {
    if (attendeeInput.trim()) {
      setEventData((prev) => ({
        ...prev,
        attendees: [...prev.attendees, attendeeInput.trim()],
      }));
      setAttendeeInput("");
    }
  };

  const handleAttendeeRemove = (index: number) => {
    setEventData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(eventData);
  };

  // 利用可能な色の配列
  const colorOptions = [
    { name: "青", value: "bg-blue-500" },
    { name: "緑", value: "bg-green-500" },
    { name: "紫", value: "bg-purple-500" },
    { name: "黄", value: "bg-yellow-500" },
    { name: "ピンク", value: "bg-pink-500" },
    { name: "テール", value: "bg-teal-500" },
    { name: "シアン", value: "bg-cyan-500" },
    { name: "赤", value: "bg-red-400" },
    { name: "インディゴ", value: "bg-indigo-500" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-white/20 text-white">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">新しい予定を作成</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* タイトル */}
          <div>
            <label className="block text-sm mb-1">タイトル</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 日付選択 */}
          <div>
            <label className="block text-sm mb-1">
              <Calendar className="inline-block mr-1 h-4 w-4" />
              日付
            </label>
            <select
              name="day"
              value={eventData.day}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {weekDays.map((day, i) => (
                <option key={i} value={i + 1}>
                  {day}, {weekDates[i]} {currentMonth}
                </option>
              ))}
            </select>
          </div>

          {/* 時間 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">
                <Clock className="inline-block mr-1 h-4 w-4" />
                開始時間
              </label>
              <input
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">終了時間</label>
              <input
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* 場所 */}
          <div>
            <label className="block text-sm mb-1">
              <MapPin className="inline-block mr-1 h-4 w-4" />
              場所
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 説明 */}
          <div>
            <label className="block text-sm mb-1">説明</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* 主催者 */}
          <div>
            <label className="block text-sm mb-1">主催者</label>
            <input
              type="text"
              name="organizer"
              value={eventData.organizer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 参加者 */}
          <div>
            <label className="block text-sm mb-1">
              <Users className="inline-block mr-1 h-4 w-4" />
              参加者
            </label>
            <div className="flex">
              <input
                type="text"
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 rounded-l border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="参加者のメールアドレスや名前"
              />
              <button
                type="button"
                onClick={handleAttendeeAdd}
                className="px-3 py-2 bg-blue-500 rounded-r hover:bg-blue-600"
              >
                追加
              </button>
            </div>
            {eventData.attendees.length > 0 && (
              <div className="mt-2 space-y-1">
                {eventData.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/10 px-3 py-1 rounded"
                  >
                    <span className="text-sm">{attendee}</span>
                    <button
                      type="button"
                      onClick={() => handleAttendeeRemove(index)}
                      className="text-white/70 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* カラー選択 */}
          <div>
            <label className="block text-sm mb-1">色</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleColorChange(color.value)}
                  className={`w-8 h-8 rounded-full ${color.value} border-2 ${
                    eventData.color === color.value
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  title={color.name}
                ></button>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
