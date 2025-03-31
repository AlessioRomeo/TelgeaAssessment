"use client";

import type { ReactNode } from "react";

export interface ActionButtonProps {
  label: string | ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

interface ActionButtonsProps {
  buttons: ActionButtonProps[];
  className?: string;
}

export default function ActionButtons({ buttons, className }: ActionButtonsProps) {
  return (
      <div className={`flex justify-center gap-4 mt-auto ${className}`}>
        {buttons.map((button, index) => {
          const isSecondary = button.variant === "secondary" || (buttons.length > 1 && index === 0);
          return (
              <button
                  key={index}
                  type="button"
                  onClick={button.onClick}
                  disabled={button.disabled}
                  aria-label={typeof button.label === "string" ? button.label : undefined}
                  className={`
              w-1/2 h-14 rounded-lg 
              inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors
              focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none
              ${
                      isSecondary
                          ? "bg-white border border-gray-200 text-black hover:bg-gray-100"
                          : "bg-[#1F1F1F] text-white hover:bg-gray-800"
                  }
              ${button.className || ""}
            `}
              >
                {typeof button.label === "string" ? <span className="text-sm">{button.label}</span> : button.label}
              </button>
          );
        })}
      </div>
  );
}
