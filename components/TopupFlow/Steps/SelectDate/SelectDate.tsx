"use client"

import React, {useState, useCallback} from "react"
import {useTopupFlow, TopupFlowStep} from "../../TopupFlowContext"
import ActionButtons from "../../Reusable/ActionButtons"
import Header from "../../Reusable/Header"
import Image from "next/image"
import RequestOverlay from "../../Reusable/RequestOverlay"
import SelectDateCalendar from "../SelectDate/SelectDateCalendar"
import {getCountryFlag} from "@/utils/countries"

export default function SelectDate() {
    const {flowData, updateFlowData, goToStep, resetFlow} = useTopupFlow()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [attemptCount, setAttemptCount] = useState(0)

    const selectedCountry = flowData.selectedCountry
    const selectedTopup = flowData.selectedTopup || ""
    const isInternational = Boolean(selectedCountry)

    const handleBack = useCallback(() => {
        if (isInternational) {
            goToStep(TopupFlowStep.INTERNATIONAL_DATA_TOPUPS)
        } else {
            goToStep(TopupFlowStep.SELECT_TOPUP)
        }
    }, [goToStep, isInternational])

    const handleCancel = useCallback(() => {
        resetFlow()
    }, [resetFlow])

    const handleDateSelect = useCallback(
        (day: number, month: number, year: number) => {
            setSelectedDate(new Date(year, month, day))
        },
        []
    )

    const handleRequestTopup = useCallback(() => {
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
    }, [attemptCount, selectedDate, updateFlowData, goToStep])

    const handleTryAgain = useCallback(() => {
        setIsError(false)
        handleRequestTopup()
    }, [handleRequestTopup])

    const handleContactSupport = useCallback(() => {
        console.log("Contact support clicked")
    }, [])

    return (
        <div role="main" className="w-full flex flex-col">
            {/* This is to show the loading / error. This is just for Demo purposes, in production it would be very different */}
            <RequestOverlay
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

            <Header showCancel={true} onCancel={handleCancel}/>

            {isInternational ? (
                <>
                    <h1 className="text-2xl font-medium mb-4 pt-3">
                        Top up International Data
                    </h1>
                    <div className="flex items-center mb-6">
                        <div className="w-9 h-9 mr-3 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                            <Image
                                src={getCountryFlag(selectedCountry)}
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
                <SelectDateCalendar
                    currentDate={currentDate}
                    onChangeCurrentDate={setCurrentDate}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                />
            </div>

            <ActionButtons
                className="mb-6"
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
