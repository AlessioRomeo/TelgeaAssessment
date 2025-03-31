"use client"

import { useState } from "react"
import { useTopupFlow, TopupFlowStep } from "../TopupFlowContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ActionButtons from "../Reusable/ActionButtons"
import Header from "../Reusable/Header"
import Image from "next/image"
import SendingTextLoad from "../Reusable/SendingTextLoad"

export default function SelectDate() {
  const { flowData, updateFlowData, goToStep, resetFlow } = useTopupFlow()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)

  const selectedCountry = flowData.selectedCountry
  const selectedTopup = flowData.selectedTopup || ""
  const isInternational = !!selectedCountry

  const getCountryFlag = () => {
    if (!selectedCountry) return "/placeholder.svg"
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

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  const monthYearString = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const calendarDays = []

  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = daysInPrevMonth - firstDayOfWeek + i + 1
    calendarDays.push({
      day,
      month: currentMonth - 1,
      year: currentYear,
      isCurrentMonth: false,
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: currentMonth,
      year: currentYear,
      isCurrentMonth: true,
    })
  }

  const remainingDays = 42 - calendarDays.length
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      month: currentMonth + 1,
      year: currentYear,
      isCurrentMonth: false,
    })
  }

  const weeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateSelect = (day: number, month: number, year: number) => {
    setSelectedDate(new Date(year, month, day))
  }

  const isDateSelected = (day: number, month: number, year: number) => {
    if (!selectedDate) return false
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
  }

  const handleBack = () => {
    if (isInternational) {
      goToStep(TopupFlowStep.INTERNATIONAL_DATA_TOPUPS)
    } else {
      goToStep(TopupFlowStep.SELECT_TOPUP)
    }
  }

  const handleCancel = () => {
    resetFlow()
  }

  const handleRequestTopup = () => {
    if (selectedDate) {
      updateFlowData({
        selectedDate: selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })
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
          setIsError(false)
          goToStep(TopupFlowStep.TOPUP_REQUESTED)
        }
      }, 3000)
    }
  }

  const handleTryAgain = () => {
    setIsError(false)
    handleRequestTopup()
  }

  const handleContactSupport = () => {
    console.log("Contact support clicked")
  }

  return (
      <div role="main" className="w-full flex flex-col">
        <SendingTextLoad
            isVisible={isLoading || isError}
            isError={isError}
            loadingTitle="Sending top-up request"
            loadingDescription="Please wait"
            errorTitle="Couldn't send request"
            errorDescription="Please try again"
            buttons={
              isError
                  ? [
                    {
                      label: "Try again",
                      onClick: handleTryAgain,
                      variant: "secondary",
                    },
                    {
                      label: "Contact Support",
                      onClick: handleContactSupport,
                      variant: "primary",
                    },
                  ]
                  : undefined
            }
        />

        <Header showCancel={true} onCancel={handleCancel} />

        {isInternational ? (
            <>
              <h1 className="text-2xl font-medium mb-4 pt-3">Top up International Data</h1>

              <div className="flex items-center mb-6">
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

              <h2 className="text-2xl font-medium mb-4">Add {selectedTopup}</h2>
            </>
        ) : (
            <>
              <h1 className="text-2xl font-medium mb-2">+ {selectedTopup}</h1>
              <p className="text-xl text-gray-500 font-medium mb-3">HomeZone</p>
            </>
        )}

        <p className="text-base mb-6">When should the top-up be activated?</p>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <button type="button" onClick={handlePrevMonth} className="p-2" aria-label="Previous month">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-base font-medium">{monthYearString}</h2>
            <button type="button" onClick={handleNextMonth} className="p-2" aria-label="Next month">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].map((day) => (
                <div key={day} role="columnheader" className="text-center py-1 text-sm font-medium">
                  {day}
                </div>
            ))}
          </div>

          <div role="grid" className="grid grid-cols-7 gap-y-1">
            {weeks.flat().map((dateObj, index) => {
              const { day, month, year, isCurrentMonth } = dateObj
              const isSelected = isDateSelected(day, month, year)
              return (
                  <div key={index} role="gridcell" className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => isCurrentMonth && handleDateSelect(day, month, year)}
                        disabled={!isCurrentMonth}
                        className={`
                    h-9 w-9 flex items-center justify-center text-sm rounded-full
                    ${isCurrentMonth ? "text-black" : "text-gray-300"}
                    ${isSelected ? "bg-[#C8FF00]" : ""}
                  `}
                        aria-label={`${day}/${month + 1}/${year}`}
                        aria-selected={isSelected}
                    >
                      {day}
                    </button>
                  </div>
              )
            })}
          </div>
        </div>

        <ActionButtons
            className={"mb-6"}
            buttons={[
              {
                label: "Back",
                onClick: handleBack,
                variant: "secondary",
              },
              {
                label: "Request Top-up",
                onClick: handleRequestTopup,
                disabled: !selectedDate,
              },
            ]}
        />
      </div>
  )
}
