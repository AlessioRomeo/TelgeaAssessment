"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react"

/**
 * The possible steps in the flow.
 */
export enum TopupFlowStep {
  ENTER_NUMBER = "ENTER_NUMBER",
  SELECT_TOPUP = "SELECT_TOPUP",
  SELECT_DATE = "SELECT_DATE",
  INTERNATIONAL_DATA = "INTERNATIONAL_DATA",
  INTERNATIONAL_DATA_TOPUPS = "INTERNATIONAL_DATA_TOPUPS",
  TOPUP_REQUESTED = "TOPUP_REQUESTED",
}

/**
 * Data collected throughout the top-up flow.
 */
interface TopupFlowData {
  phoneNumber: string
  selectedTopup?: string
  verificationCode?: string
  selectedDate?: string
  selectedCountry?: string
}

/**
 * The shape of the TopupFlow context state.
 */
interface TopupFlowState {
  currentStep: TopupFlowStep
  flowData: TopupFlowData
}

/**
 * Defines the actions allowed in our useReducer.
 */
type TopupFlowAction =
    | { type: "GO_TO_STEP"; payload: TopupFlowStep }
    | { type: "UPDATE_FLOW_DATA"; payload: Partial<TopupFlowData> }
    | { type: "RESET_FLOW" }

/**
 * Reducer function handling state transitions for the top-up flow.
 */
function topupFlowReducer(
    state: TopupFlowState,
    action: TopupFlowAction
): TopupFlowState {
  switch (action.type) {
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "UPDATE_FLOW_DATA":
      return {
        ...state,
        flowData: {
          ...state.flowData,
          ...action.payload,
        },
      }
    case "RESET_FLOW":
      return {
        currentStep: TopupFlowStep.ENTER_NUMBER,
        flowData: initialFlowData,
      }
    default:
      return state
  }
}

/**
 * Initial data state (it is just an example).
 * Prepopulated phoneNumber for demonstration.
 */
const initialFlowData: TopupFlowData = {
  phoneNumber: "34426798",
}

/**
 * The context shape that our components will consume.
 */
interface TopupFlowContextType {
  currentStep: TopupFlowStep
  flowData: TopupFlowData
  goToStep: (step: TopupFlowStep) => void
  updateFlowData: (data: Partial<TopupFlowData>) => void
  resetFlow: () => void
}

/**
 * Create the TopupFlow context.
 */
const TopupFlowContext = createContext<TopupFlowContextType | undefined>(undefined)

/**
 * TopupFlowProvider component that wraps the entire flow.
 */
export function TopupFlowProvider({ children }: { children: ReactNode }) {
  // Initialize useReducer with the default step & flow data.
  const [state, dispatch] = useReducer(topupFlowReducer, {
    currentStep: TopupFlowStep.ENTER_NUMBER,
    flowData: initialFlowData,
  })

  /**
   * Moves the flow to the specified step.
   */
  const goToStep = (step: TopupFlowStep) => {
    dispatch({ type: "GO_TO_STEP", payload: step })
  }

  /**
   * Merges partial updates into the existing flow data.
   */
  const updateFlowData = (data: Partial<TopupFlowData>) => {
    dispatch({ type: "UPDATE_FLOW_DATA", payload: data })
  }

  /**
   * Resets the flow to the initial step and data.
   */
  const resetFlow = () => {
    dispatch({ type: "RESET_FLOW" })
  }

  const value: TopupFlowContextType = {
    currentStep: state.currentStep,
    flowData: state.flowData,
    goToStep,
    updateFlowData,
    resetFlow,
  }

  return (
      <TopupFlowContext.Provider value={value}>
        {children}
      </TopupFlowContext.Provider>
  )
}

/**
 * A convenience hook to consume the TopupFlowContext from any child component.
 */
export function useTopupFlow(): TopupFlowContextType {
  const context = useContext(TopupFlowContext)
  if (context === undefined) {
    throw new Error("useTopupFlow must be used within a TopupFlowProvider")
  }
  return context
}
