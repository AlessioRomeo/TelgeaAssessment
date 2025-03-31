"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the possible steps in the flow
export enum TopupFlowStep {
  ENTER_NUMBER = "ENTER_NUMBER",
  SELECT_TOPUP = "SELECT_TOPUP",
  SELECT_DATE = "SELECT_DATE",
  INTERNATIONAL_DATA = "INTERNATIONAL_DATA",
  INTERNATIONAL_DATA_TOPUPS = "INTERNATIONAL_DATA_TOPUPS",
  TOPUP_REQUESTED = "TOPUP_REQUESTED",
}

// Define the data structure we'll store in the context
interface TopupFlowData {
  phoneNumber: string
  selectedTopup?: string
  verificationCode?: string
  selectedDate?: string
  selectedCountry?: string
}

// Define the context shape
interface TopupFlowContextType {
  currentStep: TopupFlowStep
  flowData: TopupFlowData
  goToStep: (step: TopupFlowStep) => void
  updateFlowData: (data: Partial<TopupFlowData>) => void
  resetFlow: () => void
}

const TopupFlowContext = createContext<TopupFlowContextType | undefined>(undefined)

// Initial data state as an example
const initialFlowData: TopupFlowData = {
  phoneNumber: "34426798",
}

export function TopupFlowProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<TopupFlowStep>(TopupFlowStep.ENTER_NUMBER)
  const [flowData, setFlowData] = useState<TopupFlowData>(initialFlowData)

  const goToStep = (step: TopupFlowStep) => {
    setCurrentStep(step)
  }

  const updateFlowData = (data: Partial<TopupFlowData>) => {
    setFlowData((prevData) => ({ ...prevData, ...data }))
  }

  const resetFlow = () => {
    setCurrentStep(TopupFlowStep.ENTER_NUMBER)
    setFlowData(initialFlowData)
  }

  return (
    <TopupFlowContext.Provider value={{ currentStep, flowData, goToStep, updateFlowData, resetFlow }}>
      {children}
    </TopupFlowContext.Provider>
  )
}

// Custom hook for using the context
export function useTopupFlow() {
  const context = useContext(TopupFlowContext)
  if (context === undefined) {
    throw new Error("useTopupFlow must be used within a TopupFlowProvider")
  }
  return context
}

