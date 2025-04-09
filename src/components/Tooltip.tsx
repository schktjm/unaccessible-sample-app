import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

export const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="group relative inline-block max-w-full">
      {children}
      <div className="pointer-events-none absolute -top-7 left-1/2 w-max -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-md bg-white/20 backdrop-blur-lg border border-white/20 px-2 py-1 text-xs text-white">
          {message}
        </div>
      </div>
    </div>
  );
};
