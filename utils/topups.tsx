
/**
 * Represents a top-up option in the app.
 * `isHomeZone` indicates whether it applies to the home zone or not.
 */
export interface TopupDefinition {
    title: string
    subtitle: string
    isHomeZone: boolean
}

/**
 * A list of top-up options for the home zone (domestic).
 * Some steps allow selecting these directly.
 */
export const HOME_ZONE_TOPUPS: TopupDefinition[] = [
    {
        title: "+ 5GB Fast Data",
        subtitle: "Home Zone",
        isHomeZone: true,
    },
    {
        title: "+ 200 Minutes",
        subtitle: "Home Zone",
        isHomeZone: true,
    },
    {
        title: "Get International Data",
        subtitle: "Outside Homezone",
        isHomeZone: false,
    },
]

/**
 * A list of top-up options for international usage.
 * Typically, these will have a dynamic subtitle (the user’s chosen country),
 * but we can store a default subtitle or leave it empty if desired.
 */
export const INTERNATIONAL_TOPUPS: TopupDefinition[] = [
    {
        title: "+ 1GB Fast Data",
        subtitle: "",
        isHomeZone: false,
    },
    {
        title: "+ 5GB Fast Data",
        subtitle: "",
        isHomeZone: false,
    },
]
