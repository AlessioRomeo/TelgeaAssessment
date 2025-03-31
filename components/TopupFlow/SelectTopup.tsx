"use client"

import { useTopupFlow, TopupFlowStep } from "./TopupFlowContext"
import TopupOption from "./TopupOption"
import Header from "./Header"

export default function SelectTopup() {
  const { flowData, updateFlowData, goToStep, resetFlow } = useTopupFlow()
  const userName = "Alessio" // This would come from user data in a real app

  const handleCancel = () => {
    resetFlow()
  }

  const handleSelectOption = (option: string, isHomeZone: boolean) => {
    updateFlowData({ selectedTopup: option })
    if (isHomeZone) {
      goToStep(TopupFlowStep.SELECT_DATE)
    } else {
      goToStep(TopupFlowStep.INTERNATIONAL_DATA)
    }
  }

  return (
      <div role="main" className="w-full flex flex-col">
        <Header showCancel={true} onCancel={handleCancel} />
        <h1 className="text-2xl font-medium mb-4 pt-3">Hi {userName}!</h1>
        <p className="text-md mb-8">You can now choose the top-up you want to request for your plan.</p>
        <section aria-label="Top-up options" className="flex flex-col gap-1">
          <TopupOption
              title="+ 5GB Fast Data"
              subtitle="Home Zone"
              onClick={() => handleSelectOption("5GB Fast Data", true)}
          />
          <TopupOption
              title="+ 200 Minutes"
              subtitle="Home Zone"
              onClick={() => handleSelectOption("200 Minutes", true)}
          />
          <TopupOption
              title="Get International Data"
              subtitle="Outside Homezone"
              onClick={() => handleSelectOption("International Data", false)}
          />
        </section>
      </div>
  )
}
