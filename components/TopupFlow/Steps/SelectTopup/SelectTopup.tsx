"use client"

import React, { useCallback } from "react"
import { useTopupFlow, TopupFlowStep } from "../../TopupFlowContext"
import Header from "../../Reusable/Header"
import TopupOptionsList from "./TopupOptionsList"

/**
 * Allows the user to choose the type of top-up (home zone or international).
 */
export default function SelectTopup() {
    const { updateFlowData, goToStep, resetFlow } = useTopupFlow()

    // In a real app, userName might come from an auth context or user profile.
    const userName = "Alessio"

    /**
     * Resets the flow entirely, returning to the initial step.
     */
    const handleCancel = useCallback(() => {
        resetFlow()
    }, [resetFlow])

    /**
     * Updates context with the chosen top-up option,
     * then navigates to the next step.
     */
    const handleSelectOption = useCallback(
        (option: string, isHomeZone: boolean) => {
            updateFlowData({ selectedTopup: option })
            if (isHomeZone) {
                goToStep(TopupFlowStep.SELECT_DATE)
            } else {
                goToStep(TopupFlowStep.INTERNATIONAL_DATA)
            }
        },
        [updateFlowData, goToStep]
    )

    return (
        <div role="main" className="w-full flex flex-col">
            <Header showCancel={true} onCancel={handleCancel} />

            <h1 className="text-2xl font-medium mb-4 pt-3">Hi {userName}!</h1>
            <p className="text-md mb-8">
                You can now choose the top-up you want to request for your plan.
            </p>

            <TopupOptionsList onSelectOption={handleSelectOption} />
        </div>
    )
}
