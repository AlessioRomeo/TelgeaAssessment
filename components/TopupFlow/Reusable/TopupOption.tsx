"use client"

import React, { useCallback } from "react"

interface TopupOptionProps {
  /**
   * The main text for the top-up (e.g., "+ 5GB Fast Data").
   */
  title: string
  /**
   * The smaller subtitle or detail (e.g., "Home Zone").
   */
  subtitle: string
  /**
   * Called when the user clicks this option.
   */
  onClick: () => void
}

/**
 * TopupOption:
 * A button-style component representing a single top-up choice.
 */
export default function TopupOption({ title, subtitle, onClick }: TopupOptionProps) {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
      <button
          type="button"
          onClick={handleClick}
          aria-label={`${title} ${subtitle}`}
          className="w-full flex items-center justify-center p-5 mb-2 bg-[#F6F5F4] border border-[#E9E7E2] rounded-2xl h-[130px]"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-medium text-[#151515]">{title}</span>
          <span className="text-base font-medium text-[#151515] opacity-50">
          {subtitle}
        </span>
        </div>
      </button>
  )
}
