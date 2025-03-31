"use client"

import React, { ReactNode, useCallback } from "react"

export interface ActionButtonProps {
  /**
   * The label text or custom ReactNode for the button.
   */
  label: string | ReactNode
  /**
   * Click handler
   */
  onClick: () => void
  /**
   * Style variant for the button. Defaults to "primary" if not secondary or if only one button is present.
   */
  variant?: "primary" | "secondary"
  /**
   * Disable the button if true.
   */
  disabled?: boolean
  /**
   * Additional classes passed to the button element.
   */
  className?: string
}

interface ActionButtonsProps {
  /**
   * An array of button definitions to render.
   */
  buttons: ActionButtonProps[]
  /**
   * Optional additional classes for the container.
   */
  className?: string
}

/**
 * ActionButtons:
 * Renders a row of buttons (usually "Back", "Next", "Cancel", etc.).
 * If multiple buttons are provided, the first is considered "secondary"
 * unless otherwise specified by `variant`.
 */
export default function ActionButtons({ buttons, className }: ActionButtonsProps) {
  /**
   * Renders a single button in the group, applying styling based on variant.
   */
  const renderButton = useCallback(
      (button: ActionButtonProps, index: number) => {
        const isSecondary =
            button.variant === "secondary" || (buttons.length > 1 && index === 0)

        return (
            <button
                key={index}
                type="button"
                onClick={button.onClick}
                disabled={button.disabled}
                aria-label={
                  typeof button.label === "string" ? button.label : undefined
                }
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
              {typeof button.label === "string" ? (
                  <span className="text-sm">{button.label}</span>
              ) : (
                  button.label
              )}
            </button>
        )
      },
      [buttons]
  )

  return (
      <div
          className={`flex justify-center gap-4 mt-auto ${className || ""}`}
          role="group"
          aria-label="Action buttons"
      >
        {buttons.map(renderButton)}
      </div>
  )
}
