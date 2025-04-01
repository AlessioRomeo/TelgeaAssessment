import React from "react"

interface StepItemProps {
    number: number
    title: string
    description: string
}

/**
 * A single step item for the "How it works" section.
 * @param number - The numeric step indicator.
 * @param title - The short title for the step.
 * @param description - A brief description for the step.
 */
export default function StepItem({ number, title, description }: StepItemProps) {
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
