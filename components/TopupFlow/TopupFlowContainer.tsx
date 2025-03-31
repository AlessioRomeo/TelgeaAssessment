"use client"

import React from "react"
import { TopupFlowProvider } from "./TopupFlowContext"
import FlowStepRenderer from "./FlowStepRenderer"

/**
 * Wraps the entire multistep flow with a TopupFlowProvider
 * and renders the current step (via FlowStepRenderer).
 */
export default function TopupFlowContainer() {
  return (
      <TopupFlowProvider>
        <FlowStepRenderer />
      </TopupFlowProvider>
  )
}
