import FlightForm from "@/components/FlightForm"
import FlightLists from "@/components/FlightLists"
import FlightsAllBtn from "@/components/FlightsAllBtn"
import { getArrivalDestinations, getDepartureDestinations, getFlightByQuery } from "@/utils/helper"

interface SearchParams {
  departure: string
  arrival: string
  all: string
}

export default async function Home({
  searchParams
}: { searchParams: Promise<SearchParams> }) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? process.env.URL_PRODUCTION 
    : process.env.URL_DEVELOPMENT

  try {
    const resolvedSearchParams = await searchParams
    const departure = resolvedSearchParams.departure || ''
    const arrival = resolvedSearchParams.arrival || ''
    const getAll = resolvedSearchParams.all || ''

    const response = await fetch(`${API_URL}/api/flights`, { cache: 'force-cache' })

    if (!response.ok) {
      throw new Error(`Error fetching flight data: ${response.statusText}`)
    }

    const flightData = await response.json() as FlightData

    const departureDest = getDepartureDestinations(flightData)
    const arrivalDest = getArrivalDestinations(flightData)
    const flightSearch = getFlightByQuery(arrival, departure, flightData)

    return (
      <main className="w-full min-h-[100vh]">
        <article className="p-4 w-full flex flex-col gap-4 justify-center items-center">
          <FlightForm flightList={flightData} departures={departureDest} arrivals={arrivalDest} />
          <FlightsAllBtn />
          { !departure && !arrival && !getAll ? (
            null
          ) : (
            <FlightLists flightData={getAll ? flightData : flightSearch} />
          ) }
        </article>
      </main>
    )
  } catch (error) {
    console.error("Error in Home component:", error)
    return (
      <main className="w-full min-h-[100vh] flex justify-center items-center">
        <p>Error fetching flight data. Please try again later.</p>
      </main>
    )
  }
}
