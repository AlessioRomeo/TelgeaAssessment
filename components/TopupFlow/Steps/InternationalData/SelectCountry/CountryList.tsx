"use client"

import React from "react"
import Image from "next/image"

interface Country {
    name: string
    code: string
    flagUrl: string
}

interface CountryListProps {
    countries: Country[]
    searchQuery: string
    onSelectCountry: (countryName: string, flagUrl: string) => void
}

export default function CountryList({
                                        countries,
                                        searchQuery,
                                        onSelectCountry,
                                    }: CountryListProps) {
    const filteredCountries = React.useMemo(
        () =>
            countries.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [countries, searchQuery]
    )

    return (
        <div className="mt-2 space-y-1">
            {filteredCountries.map((country) => (
                <button
                    key={country.code}
                    type="button"
                    onClick={() => onSelectCountry(country.name, country.flagUrl)}
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
    )
}
