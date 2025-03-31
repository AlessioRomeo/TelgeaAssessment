
/** A union type for the country names we support in our app. */
export type CountryName =
    | "Denmark"
    | "Sweden"
    | "Norway"
    | "Germany"
    | "France"
    | "United Kingdom"
/* Add more names as needed but in production we will most likely pull this from a database */

export interface Country {
    name: CountryName
    code: string
    flagUrl: string
}

/**
 * A shared list of all countries recognized by our international data flow.
 * This array replaces the inline arrays we had in various components.
 */
export const COUNTRIES: Country[] = [
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
        flagUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_the_United_Kingdom_%281-1%29.svg",
    },
    // ... add or remove countries as needed but this will also probably be pulled from database in production
]

/**
 * Returns the flag URL for a given country name.
 * If the country isn't found or is undefined, returns a placeholder.
 */
export function getCountryFlag(countryName?: string): string {
    if (!countryName) return "/placeholder.svg"
    const found = COUNTRIES.find((c) => c.name === countryName)
    return found?.flagUrl || "/placeholder.svg"
}
