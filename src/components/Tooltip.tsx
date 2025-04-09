import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

export const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute -top-7 left-1/2 w-max -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-md bg-gray-900 px-2 py-1 text-xs text-white">
          {message}
        </div>
      </div>
    </div>
  );
};
