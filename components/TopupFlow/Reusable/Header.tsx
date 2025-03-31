"use client"

import React, { useCallback } from "react"
import BrandLogo from "./BrandLogo"

interface HeaderProps {
    /**
     * Whether to show the "Cancel" button on the right side.
     */
    showCancel?: boolean
    /**
     * Callback for when the user clicks "Cancel".
     */
    onCancel?: () => void
    /**
     * Additional classes for the header container.
     */
    className?: string
}

/**
 * Header:
 * A top bar with a Telgea brand logo and an optional "Cancel" button.
 */
export default function Header({
                                   showCancel = true,
                                   onCancel,
                                   className = "mb-5",
                               }: HeaderProps) {
    // Minor optimization to avoid re-creating the cancel handler
    const handleCancel = useCallback(() => {
        onCancel?.()
    }, [onCancel])

    return (
        <div className={`flex justify-between items-center ${className}`}>
            {/* Brand logo (black circle + "Telgea") */}
            <BrandLogo />

            {showCancel && onCancel && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-[#B5B5B2] flex items-center text-sm"
                >
                    Cancel
                    <svg
                        aria-hidden="true"
                        className="ml-1 opacity-25"
                        width="13"
                        height="13"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1L14 14M1 14L14 1" stroke="black" strokeWidth="2" />
                    </svg>
                </button>
            )}
        </div>
    )
}
