"use client"

import React, { useCallback } from "react"
import { useTopupFlow, TopupFlowStep } from "../../../TopupFlowContext"
import Header from "../../../Reusable/Header"
import Image from "next/image"
import TopupOption from "../../../Reusable/TopupOption"

import { getCountryFlag } from "@/utils/countries"
import { INTERNATIONAL_TOPUPS } from "@/utils/topups"

export default function InternationalDataTopups() {
    const { flowData, updateFlowData, goToStep, resetFlow } = useTopupFlow()
    const selectedCountry = flowData.selectedCountry || "Denmark"

    const handleCancel = useCallback(() => {
        resetFlow()
    }, [resetFlow])

    const handleSelectTopup = useCallback(
        (topup: string) => {
            updateFlowData({ selectedTopup: topup })
            goToStep(TopupFlowStep.SELECT_DATE)
        },
        [updateFlowData, goToStep]
    )

    return (
        <div role="main" className="w-full flex flex-col">
            <Header showCancel={true} onCancel={handleCancel} />
            <h1 className="text-2xl font-medium mb-4 pt-3">
                Top up International Data
            </h1>
            <div className="flex items-center mb-3">
                <div className="w-9 h-9 mr-3 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                    <Image
                        src={getCountryFlag(selectedCountry)}
                        alt={`Flag of ${selectedCountry}`}
                        width={34}
                        height={34}
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="text-md font-normal">{selectedCountry}</span>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-medium mb-1">
                    How much data do you want to add?
                </h2>
                <p className="text-sm text-gray-600">
                    The data will be active until the end of the month.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {INTERNATIONAL_TOPUPS.map((item, index) => (
                    <TopupOption
                        key={index}
                        title={item.title}
                        // Use the user’s chosen country for the subtitle
                        subtitle={selectedCountry || item.subtitle}
                        onClick={() => handleSelectTopup(item.title)}
                    />
                ))}
            </div>
        </div>
    )
}
