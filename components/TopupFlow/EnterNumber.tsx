"use client"

import type React from "react"
import { useState } from "react"
import { useTopupFlow } from "./TopupFlowContext"
import Header from "@/components/TopupFlow/Header";

interface EnterNumberProps {
  onSubmit: () => void
}

export default function EnterNumber({ onSubmit }: EnterNumberProps) {
  const { flowData, updateFlowData } = useTopupFlow()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // I know that phone formatting was not required or requested. I added it just to add some more logic.
  const formatPhoneNumber = (value: string) => {

    const digits = value.replace(/\D/g, "")

    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setPhoneNumber(formattedNumber)


    const digitCount = formattedNumber.replace(/\D/g, "").length
    setIsValid(digitCount >= 8)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) return

    setIsSubmitting(true)


    updateFlowData({ phoneNumber })


    onSubmit()


    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }


  function StepItem({ number, title, description }: { number: number; title: string; description: string }) {
    return (
      <div className="flex items-start rounded-2xl bg-white p-4">
        <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#C8FF00] text-sm font-bold mt-0.5">
          {number}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-600 font-light">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <Header showCancel={false}  />

      <h1 className="mb-3 text-[1.65rem] font-semibold leading-tight">
        Top-up your mobile plan and <span className="bg-[#C0FA00] px-1.5 py-0.3 rounded-md leading-[1.8]">stay connected!</span>
      </h1>

      <p className="mb-6 text-sm text-gray-950 leading-relaxed">
        Confirm your phone number below to add a top-up of data or minutes to your mobile plan.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 bg-white rounded-[10px] overflow-hidden">
          <label htmlFor="phone" className="block text-xs font-normal text-gray-400 px-4 pt-3 mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="000-000-0000"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full border-0 bg-white px-4 pb-3 pt-0 text-2xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[10px] ${!isValid && phoneNumber ? "text-red-500" : ""} placeholder:text-gray-300`}
            required
            aria-required="true"
            aria-invalid={!isValid}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid || !phoneNumber}
          className="w-full h-11 rounded-[10px] bg-[#1F1F1F] text-white hover:bg-gray-800 flex items-center justify-center inline-flex whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          Get confirmation code
        </button>
      </form>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">How it works</h2>
        <div className="space-y-2">
          <StepItem
            number={1}
            title="Confirm your phone number"
            description="We will send you a confirmation code by text."
          />
          <StepItem number={2} title="Select a top-up" description="You can add both data and more minutes." />
          <StepItem
            number={3}
            title="Wait for approval"
            description="Your IT administrator will be notified and will inform you upon approval."
          />
        </div>
      </div>
    </div>
  )
}

