"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * A single day in the calendar grid.
 */
interface CalendarDay {
    day: number
    month: number
    year: number
    isCurrentMonth: boolean
}


interface SelectDateCalendarProps {
    /**
     * The date currently displayed (year/month).
     */
    currentDate: Date

    /**
     * Function to update the currentDate state (for month navigation).
     */
    onChangeCurrentDate: (newDate: Date) => void

    /**
     * The date the user has currently selected (or null if none).
     */
    selectedDate: Date | null

    /**
     * Triggered when the user picks a valid (current month) date.
     */
    onDateSelect: (day: number, month: number, year: number) => void
}

export default function SelectDateCalendar({
                                               currentDate,
                                               onChangeCurrentDate,
                                               selectedDate,
                                               onDateSelect,
                                           }: SelectDateCalendarProps) {
    // Move to the previous month
    const handlePrevMonth = React.useCallback(() => {
        onChangeCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        )
    }, [currentDate, onChangeCurrentDate])

    // Move to the next month
    const handleNextMonth = React.useCallback(() => {
        onChangeCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        )
    }, [currentDate, onChangeCurrentDate])

    // Returns true if this day matches the user-selected date
    const isDateSelected = React.useCallback(
        (day: number, month: number, year: number) => {
            if (!selectedDate) return false
            return (
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
            )
        },
        [selectedDate]
    )

    // Build the array of days (6 weeks total)
    const getCalendarDays = React.useCallback(() => {
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
        const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

        const calendarDays: CalendarDay[] = []

        // Fill previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const day = daysInPrevMonth - firstDayOfWeek + i + 1
            calendarDays.push({
                day,
                month: currentMonth - 1,
                year: currentYear,
                isCurrentMonth: false,
            })
        }

        // Fill current month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push({
                day: i,
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true,
            })
        }

        // Fill next month to get total of 42 days
        const remainingDays = 42 - calendarDays.length
        for (let i = 1; i <= remainingDays; i++) {
            calendarDays.push({
                day: i,
                month: currentMonth + 1,
                year: currentYear,
                isCurrentMonth: false,
            })
        }

        return calendarDays
    }, [currentDate])

    const calendarDays = getCalendarDays()

    // Group into weeks
    const weeks = React.useMemo(() => {
        const chunkedWeeks = []
        for (let i = 0; i < calendarDays.length; i += 7) {
            chunkedWeeks.push(calendarDays.slice(i, i + 7))
        }
        return chunkedWeeks
    }, [calendarDays])

    const monthYearString = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-base font-medium">{monthYearString}</h2>
                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2"
                    aria-label="Next month"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"].map((day) => (
                    <div
                        key={day}
                        role="columnheader"
                        className="text-center py-1 text-sm font-medium"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div role="grid" className="grid grid-cols-7 gap-y-1">
                {weeks.flat().map((dateObj, index) => {
                    const { day, month, year, isCurrentMonth } = dateObj
                    const selected = isDateSelected(day, month, year)

                    return (
                        <div key={index} role="gridcell" className="flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => isCurrentMonth && onDateSelect(day, month, year)}
                                disabled={!isCurrentMonth}
                                className={`
                  h-9 w-9 flex items-center justify-center text-sm rounded-full
                  ${isCurrentMonth ? "text-black" : "text-gray-300"}
                  ${selected ? "bg-[#C8FF00]" : ""}
                `}
                                aria-label={`${day}/${month + 1}/${year}`}
                                aria-selected={selected}
                            >
                                {day}
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
