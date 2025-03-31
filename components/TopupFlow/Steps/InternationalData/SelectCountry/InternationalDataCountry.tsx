"use client"

import React, { useState, useCallback } from "react"
import { useTopupFlow, TopupFlowStep } from "../../../TopupFlowContext"
import { Search } from "lucide-react"
import Header from "../../../Reusable/Header"
import ActionButtons from "../../../Reusable/ActionButtons"
import CountryList from "../SelectCountry/CountryList"

import { COUNTRIES } from "@/utils/countries"

export default function InternationalDataCountry() {
    const { goToStep, updateFlowData, resetFlow } = useTopupFlow()

    const [searchQuery, setSearchQuery] = useState("")

    const handleCancel = useCallback(() => {
        resetFlow()
    }, [resetFlow])

    const handleBack = useCallback(() => {
        goToStep(TopupFlowStep.SELECT_TOPUP)
    }, [goToStep])

    const handleSelectCountry = useCallback(
        (country: string, flagUrl: string) => {
            updateFlowData({ selectedCountry: country })
            goToStep(TopupFlowStep.INTERNATIONAL_DATA_TOPUPS)
        },
        [updateFlowData, goToStep]
    )

    return (
        <div role="main" className="w-full flex flex-col">
            <Header showCancel={true} onCancel={handleCancel} />
            <h1 className="text-2xl font-medium mb-3 pt-3">
                Top up International Data
            </h1>
            <p className="text-base mb-6">
                Which country should the data work in?
            </p>

            <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search size={20} className="text-black" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    placeholder="Search country"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#E9E7E2] focus:outline-none text-sm"
                    aria-label="Search country"
                />
            </div>

            <CountryList
                countries={COUNTRIES}
                searchQuery={searchQuery}
                onSelectCountry={handleSelectCountry}
            />

            <ActionButtons
                buttons={[
                    {
                        label: "Back",
                        onClick: handleBack,
                        variant: "secondary",
                        className: "w-1/2 mx-auto",
                    },
                ]}
                className="mt-auto pb-10"
            />
        </div>
    )
}
