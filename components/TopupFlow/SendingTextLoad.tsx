"use client"

import { useEffect, useState } from "react"
import { PiWarningCircleBold } from "react-icons/pi"

interface ButtonProps {
    label: string
    onClick: () => void
    variant?: "primary" | "secondary"
    className?: string
}

interface SendingTextLoadProps {
    isVisible: boolean
    isError?: boolean
    onTryAgain?: () => void
    onContactSupport?: () => void
    loadingTitle?: string
    loadingDescription?: string
    errorTitle?: string
    errorDescription?: string
    buttons?: ButtonProps[]
}

export default function SendingTextLoad({
                                            isVisible,
                                            isError = false,
                                            onTryAgain,
                                            onContactSupport,
                                            loadingTitle = "Sending confirmation code...",
                                            loadingDescription = "Please wait",
                                            errorTitle = "Couldn't verify code",
                                            errorDescription = "Please try again",
                                            buttons,
                                        }: SendingTextLoadProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!isVisible || !mounted) return null

    // Explicitly type defaultButtons as ButtonProps[] so that the variant property can accept both "primary" and "secondary"
    const defaultButtons: ButtonProps[] = onTryAgain
        ? [
            {
                label: "Try again",
                onClick: onTryAgain,
                variant: "secondary",
            },
        ]
        : []

    if (onContactSupport && defaultButtons.length > 0) {
        defaultButtons.push({
            label: "Contact Support",
            onClick: onContactSupport,
            variant: "primary",
        })
    }

    const actionButtons = buttons || defaultButtons

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: "blur(20px)",
                    backgroundColor: "rgba(63, 54, 47, 0.1)",
                }}
            />

            <div className="relative z-10 flex flex-col items-center w-[90%]">
                {isError ? (
                    <>
                        <div className="relative h-12 w-12 mb-5 flex items-center justify-center text-red-500">
                            <PiWarningCircleBold size={52} />
                        </div>
                        <h2 className="text-lg font-semibold text-black mb-1">{errorTitle}</h2>
                        <p className="text-xs text-gray-500 mb-6">{errorDescription}</p>

                        <div className="flex gap-3 w-full justify-center">
                            {actionButtons.map((button, index) => {
                                const isPrimary = button.variant === "primary"

                                return (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className={`
                      w-1/2 h-14 rounded-[16px] border-[3px] text-sm
                      inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors
                      focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none
                      ${
                                            isPrimary
                                                ? "border-black bg-black text-white hover:bg-black hover:text-white"
                                                : "border-black bg-transparent text-black hover:bg-transparent"
                                        }
                      ${button.className || ""}
                    `}
                                    >
                                        {button.label}
                                    </button>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative h-12 w-12 mb-5">
                            <svg className="animate-spin" viewBox="0 0 50 50" width="100%" height="100%">
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="#010101"
                                    strokeOpacity="0.1"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M25,5 A20,20 0 0,1 45,25"
                                    fill="none"
                                    stroke="#C8FF00"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-black mb-1">{loadingTitle}</h2>
                        <p className="text-xs text-gray-500">{loadingDescription}</p>
                    </>
                )}
            </div>
        </div>
    )
}
