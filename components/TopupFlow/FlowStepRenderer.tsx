"use client"

import React from "react"
import { TopupFlowStep, useTopupFlow } from "./TopupFlowContext"
import RequestOverlay from "./Reusable/RequestOverlay"
import EnterNumber from "./Steps/EnterNumber/EnterNumber"
import SelectTopup from "./Steps/SelectTopup/SelectTopup"
import SelectDate from "./Steps/SelectDate/SelectDate"
import InternationalDataCountry from "@/components/TopupFlow/Steps/InternationalData/SelectCountry/InternationalDataCountry"
import InternationalDataTopups from "@/components/TopupFlow/Steps/InternationalData/SelectTopups/InternationalDataTopups"
import TopupRequested from "./Steps/TopupRequested/TopupRequested"

/**
 * Determines which step to render based on `currentStep` in the flow context.
 * Shows loading/error states as needed.
 */
export default function FlowStepRenderer() {
    const { currentStep, goToStep } = useTopupFlow()

    // Local UI states for demonstration of load/error (not in context, as it’s purely local).
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [attemptCount, setAttemptCount] = React.useState(0)

    /**
     * Submits the top-up request or triggers an error on the first attempt.
     */
    const handleSubmit = React.useCallback(() => {
        setIsLoading(true)
        setIsError(false)

        // After 3 seconds, show error on first attempt.
        // On subsequent attempts, proceed to next step.

        // NOTE: I know we were supposed to redirect the user to different pages on 'Try Again', however I decided to
        // do "fake it" this way so that you can experience the actual flow of the app and see all pages when testing it
        setTimeout(() => {
            setIsLoading(false)

            if (attemptCount === 0) {
                setIsError(true)
                setAttemptCount(1)
            } else {
                // On second attempt, proceed to SELECT_TOPUP
                setIsError(false)
                goToStep(TopupFlowStep.SELECT_TOPUP)
            }
        }, 3000)
    }, [attemptCount, goToStep])

    /**
     * Allows the user to retry the submission if an error occurred.
     */
    const handleTryAgain = React.useCallback(() => {
        setIsError(false)
        handleSubmit()
    }, [handleSubmit])

    return (
        <>
            {/* Show the loading/error overlay if we are on ENTER_NUMBER step only */}
            {currentStep === TopupFlowStep.ENTER_NUMBER && (
                <RequestOverlay
                    isVisible={isLoading || isError}
                    isError={isError}
                    onTryAgain={handleTryAgain}
                />
            )}

            {currentStep === TopupFlowStep.ENTER_NUMBER && (
                <EnterNumber onSubmit={handleSubmit} />
            )}

            {currentStep === TopupFlowStep.SELECT_TOPUP && <SelectTopup />}

            {currentStep === TopupFlowStep.SELECT_DATE && <SelectDate />}

            {currentStep === TopupFlowStep.INTERNATIONAL_DATA && (
                <InternationalDataCountry />
            )}

            {currentStep === TopupFlowStep.INTERNATIONAL_DATA_TOPUPS && (
                <InternationalDataTopups />
            )}

            {currentStep === TopupFlowStep.TOPUP_REQUESTED && <TopupRequested />}
        </>
    )
}
