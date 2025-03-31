"use client"

import { useState } from "react"
import { useTopupFlow, TopupFlowStep } from "./TopupFlowContext"
import { Search } from "lucide-react"
import Image from "next/image"
import Header from "./Header"
import ActionButtons from "./ActionButtons"

const countries = [
  {
    name: "Denmark",
    code: "DK",
    flagUrl: "https://vectorflags.s3.amazonaws.com/flags/dk-square-01.png",
  },
  {
    name: "Sweden",
    code: "SE",
    flagUrl: "https://vectorflags.s3.amazonaws.com/flags/se-square-01.png",
  },
  {
    name: "Norway",
    code: "NO",
    flagUrl: "https://vectorflags.s3.amazonaws.com/flags/no-square-01.png",
  },
  {
    name: "Germany",
    code: "DE",
    flagUrl: "https://vectorflags.s3.amazonaws.com/flags/de-square-01.png",
  },
  {
    name: "France",
    code: "FR",
    flagUrl: "https://vectorflags.s3.amazonaws.com/flags/fr-square-01.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_the_United_Kingdom_%281-1%29.svg",
  },
]

export default function InternationalDataCountry() {
  const { goToStep, updateFlowData, resetFlow } = useTopupFlow()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCancel = () => {
    resetFlow()
  }

  const handleBack = () => {
    goToStep(TopupFlowStep.SELECT_TOPUP)
  }

  const handleSelectCountry = (country: string, flagUrl: string) => {
    setSelectedCountry(country)
    updateFlowData({ selectedCountry: country })
    goToStep(TopupFlowStep.INTERNATIONAL_DATA_TOPUPS)
  }

  return (
    <div className="w-full flex flex-col">

      <Header showCancel={true} onCancel={handleCancel} />


      <h1 className="text-2xl font-medium mb-3 pt-3">Top up International Data</h1>
      <p className="text-base mb-6">Which country should the data work in?</p>


      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search size={20} className="text-black" />
        </div>
        <input
          type="text"
          placeholder="Search country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#E9E7E2] focus:outline-none text-sm"
        />
      </div>


      <div className="mt-2 space-y-1">
        {filteredCountries.map((country) => (
          <button
            key={country.code}
            onClick={() => handleSelectCountry(country.name, country.flagUrl)}
            className="w-full flex items-center py-3 px-3"
          >
            <div className="w-8 h-8 mr-3 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
              <Image
                src={country.flagUrl || "/placeholder.svg"}
                alt={`Flag of ${country.name}`}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-base">{country.name}</span>
          </button>
        ))}
      </div>


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

