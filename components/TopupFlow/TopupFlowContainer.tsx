"use client"

import React from "react"
import { TopupFlowProvider, TopupFlowStep, useTopupFlow } from "./TopupFlowContext"
import EnterNumber from "./Steps/EnterNumber"
import SelectTopup from "./Steps/SelectTopup"
import SelectDate from "./Steps/SelectDate"
import InternationalDataCountry from "./Steps/InternationalDataCountry"
import InternationalDataTopups from "./Steps/InternationalDataTopups"
import TopupRequested from "./Steps/TopupRequested"
import SendingTextLoad from "./Reusable/SendingTextLoad"

// This component decides which step to render based on the current step in context
function FlowStepRenderer() {
  const { currentStep, goToStep } = useTopupFlow()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [attemptCount, setAttemptCount] = React.useState(0)

  const handleSubmit = () => {
    setIsLoading(true)
    setIsError(false)

    // After 3 seconds, show error on first attempt. This of course would not be the real implementation.
    // It is just to visually show all pages and the overall flow when testing it.
    setTimeout(() => {
      setIsLoading(false)

      if (attemptCount === 0) {
        setIsError(true)
        setAttemptCount(1)
      } else {
        // On second attempt, proceed to next step
        setIsError(false)
        goToStep(TopupFlowStep.SELECT_TOPUP)
      }
    }, 3000)
  }

  const handleTryAgain = () => {
    setIsError(false)
    handleSubmit()
  }

  return (
    <>
      {currentStep === TopupFlowStep.ENTER_NUMBER && (
        <SendingTextLoad isVisible={isLoading || isError} isError={isError} onTryAgain={handleTryAgain} />
      )}

      {currentStep === TopupFlowStep.ENTER_NUMBER && <EnterNumber onSubmit={handleSubmit} />}

      {currentStep === TopupFlowStep.SELECT_TOPUP && <SelectTopup />}

      {currentStep === TopupFlowStep.SELECT_DATE && <SelectDate />}

      {currentStep === TopupFlowStep.INTERNATIONAL_DATA && <InternationalDataCountry />}

      {currentStep === TopupFlowStep.INTERNATIONAL_DATA_TOPUPS && <InternationalDataTopups />}

      {currentStep === TopupFlowStep.TOPUP_REQUESTED && <TopupRequested />}
    </>
  )
}

// Main container component that wraps everything with the provider
export default function TopupFlowContainer() {
  return (
    <TopupFlowProvider>
      <FlowStepRenderer />
    </TopupFlowProvider>
  )
}

