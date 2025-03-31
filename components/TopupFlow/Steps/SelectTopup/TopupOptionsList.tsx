"use client"

import React from "react"
import TopupOption from "../../Reusable/TopupOption"
import { HOME_ZONE_TOPUPS } from "@/utils/topups"

interface TopupOptionsListProps {
    /**
     * Called when the user selects an option.
     * @param option - The selected top-up title
     * @param isHomeZone - Whether this top-up is for the home zone
     */
    onSelectOption: (option: string, isHomeZone: boolean) => void
}

/**
 * TopupOptionsList:
 * Renders the list of home-zone top-up options (imported from utils/topups.ts),
 * and notifies the parent component which option was selected.
 */
export default function TopupOptionsList({ onSelectOption }: TopupOptionsListProps) {
    return (
        <section aria-label="Top-up options" className="flex flex-col gap-1">
            {HOME_ZONE_TOPUPS.map((topup, index) => (
                <TopupOption
                    key={index}
                    title={topup.title}
                    subtitle={topup.subtitle}
                    onClick={() => onSelectOption(topup.title, topup.isHomeZone)}
                />
            ))}
        </section>
    )
}
