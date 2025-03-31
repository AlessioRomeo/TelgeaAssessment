"use client"

import React from "react"

/**
 * BrandLogo:
 * Displays the "Telgea" brand with a small black circle + text,
 * matching the styling previously hardcoded in Header and other steps.
 */
export default function BrandLogo() {
    return (
        <div className="flex items-center">
            {/* The black circle (23px by 23px) */}
            <div
                className="mr-2 rounded-full bg-black"
                style={{ width: "23px", height: "23px" }}
            />
            {/* Telgea text */}
            <span className="text-3xl font-medium">Telgea</span>
        </div>
    )
}
