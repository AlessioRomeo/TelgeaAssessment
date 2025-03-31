"use client"

import { useTopupFlow, TopupFlowStep } from "./TopupFlowContext"
import Header from "./Header"
import Image from "next/image"

export default function InternationalDataTopups() {
  const { flowData, updateFlowData, goToStep, resetFlow } = useTopupFlow()
  const selectedCountry = flowData.selectedCountry || "Denmark" // Default to Denmark if not set


  const getCountryFlag = () => {

    const countryFlags: Record<string, string> = {
      Denmark: "https://vectorflags.s3.amazonaws.com/flags/dk-square-01.png",
      Sweden: "https://vectorflags.s3.amazonaws.com/flags/se-square-01.png",
      Norway: "https://vectorflags.s3.amazonaws.com/flags/no-square-01.png",
      Germany: "https://vectorflags.s3.amazonaws.com/flags/de-square-01.png",
      France: "https://vectorflags.s3.amazonaws.com/flags/fr-square-01.png",
      "United Kingdom": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_the_United_Kingdom_%281-1%29.svg",
    }

    return countryFlags[selectedCountry] || "/placeholder.svg"
  }

  const handleCancel = () => {
    resetFlow()
  }

  const handleSelectTopup = (topup: string) => {

    updateFlowData({ selectedTopup: topup })

    goToStep(TopupFlowStep.SELECT_DATE)
  }

  return (
    <div className="w-full flex flex-col">

      <Header showCancel={true} onCancel={handleCancel} />


      <h1 className="text-2xl font-medium mb-4 pt-3">Top up International Data</h1>


      <div className="flex items-center mb-3">
        <div className="w-9 h-9 mr-3 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
          <Image
            src={getCountryFlag() || "/placeholder.svg"}
            alt={`Flag of ${selectedCountry}`}
            width={34}
            height={34}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-md font-normal">{selectedCountry}</span>
      </div>


      <div className="mb-8">
        <h2 className="text-base font-medium mb-1">How much data do you want to add?</h2>
        <p className="text-sm text-gray-600">The data will be active until the end of the month.</p>
      </div>


      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleSelectTopup("1GB Fast Data")}
          className="w-full flex flex-col items-center justify-center p-5 bg-white border border-gray-200 rounded-2xl h-[130px]"
        >
          <span className="text-xl font-medium text-[#151515]">+ 1GB Fast Data</span>
          <span className="text-base text-[#151515] opacity-50">{selectedCountry}</span>
        </button>

        <button
          onClick={() => handleSelectTopup("5GB Fast Data")}
          className="w-full flex flex-col items-center justify-center p-5 bg-white border border-gray-200 rounded-2xl h-[130px]"
        >
          <span className="text-xl font-medium text-[#151515]">+ 5GB Fast Data</span>
          <span className="text-base text-[#151515] opacity-50">{selectedCountry}</span>
        </button>
      </div>
    </div>
  )
}

