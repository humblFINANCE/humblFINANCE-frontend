export const COMPASS_COUNTRIES = [
  { display: 'United States', value: 'united_states' },
  { display: 'United Kingdom', value: 'united_kingdom' },
  { display: 'Japan', value: 'japan' },
  { display: 'Mexico', value: 'mexico' },
  { display: 'Indonesia', value: 'indonesia' },
  { display: 'Australia', value: 'australia' },
  { display: 'Brazil', value: 'brazil' },
  { display: 'Canada', value: 'canada' },
  { display: 'Italy', value: 'italy' },
  { display: 'Germany', value: 'germany' },
  { display: 'Turkey', value: 'turkey' },
  { display: 'France', value: 'france' },
  { display: 'South Africa', value: 'south_africa' },
  { display: 'South Korea', value: 'south_korea' },
  { display: 'Spain', value: 'spain' },
  { display: 'India', value: 'india' },
  { display: 'China', value: 'china' },
] as const

export type CompassCountry = (typeof COMPASS_COUNTRIES)[number]['value']

export const getDisplayName = (value: CompassCountry): string => {
  const country = COMPASS_COUNTRIES.find((c) => c.value === value)
  return country ? country.display : value
}

export const getCountryValue = (
  display: string
): CompassCountry | undefined => {
  const country = COMPASS_COUNTRIES.find((c) => c.display === display)
  return country ? country.value : undefined
}
