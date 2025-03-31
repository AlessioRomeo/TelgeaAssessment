"use client"

import React, {useCallback} from "react"
import {useTopupFlow} from "../../TopupFlowContext"
import BrandLogo from "@/components/TopupFlow/Reusable/BrandLogo"

/**
 * Final step indicating that the user's top-up request has been sent.
 * Allows the user to close the flow, resetting the entire process.
 */
export default function TopupRequested() {
    const {resetFlow} = useTopupFlow()

    /**
     * Resets the entire flow when the user clicks "Close."
     */
    const handleClose = useCallback(() => {
        resetFlow()
    }, [resetFlow])

    return (
        <div
            role="main"
            className="w-full flex flex-col pt-5 justify-between items-center overflow-hidden"
        >

            <BrandLogo/>

            <main className="flex flex-col items-center px-4 max-w-md text-center">
                <div className="text-5xl mb-6" aria-hidden="true">
                    🙌
                </div>
                <h1 className="text-2xl font-semibold mb-6">
                    That's it! Your top-up request has been sent to your IT team for approval.
                </h1>
                <p className="text-md mb-6">
                    You'll be notified by email and SMS when the top-up is active.
                </p>
                <p className="text-md">
                    It will be available immediately after approval or at midnight CET on
                    your requested activation date.
                </p>
            </main>

            <footer className="w-full flex justify-center pb-10">
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close top-up request"
                    className="
                            text-gray-500
                            hover:text-gray-700
                            bg-transparent
                            hover:bg-transparent
                            text-base
                            font-normal
                            inline-flex
                            items-center
                            justify-center
                            whitespace-nowrap
                            rounded-md
                            transition-colors
                            focus-visible:outline-none
                            disabled:opacity-50
                            disabled:pointer-events-none
                          "
                >
                    Close
                </button>
            </footer>
        </div>
    )
}
