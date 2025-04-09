import { Sparkles, X, Pause } from "lucide-react";

interface AIPopupProps {
  typedText: string;
  isPlaying: boolean;
  onClose: () => void;
  onTogglePlay: () => void;
}

export const AIPopup = ({
  typedText,
  isPlaying,
  onClose,
  onTogglePlay,
}: AIPopupProps) => {
  return (
    <div className="fixed bottom-8 right-8 z-20">
      <div className="w-[450px] relative bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-blue-300/30 text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Sparkles className="h-5 w-5 text-blue-300" />
          </div>
          <div className="min-h-[80px]">
            <p className="text-base font-light">{typedText}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onTogglePlay}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
          >
            No
          </button>
        </div>
        {isPlaying && (
          <div className="mt-4 flex items-center justify-between">
            <button
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-white text-sm hover:bg-white/20 transition-colors"
              onClick={onTogglePlay}
            >
              <Pause className="h-4 w-4" />
              <span>Pause Hans Zimmer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
