import FlightForm from "@/components/FlightForm";
import FlightLists from "@/components/FlightLists";
import FlightsAllBtn from "@/components/FlightsAllBtn";
import { getFlightData } from "@/utils/db";
import { getArrivalDestinations, getDepartureDestinations } from "@/utils/helper";

interface SearchParams {
  departure: string
  arrival: string
  forthDate: string
  backDate: string

  all: string
}

export default async function Home({
  searchParams
} : {searchParams: Promise<SearchParams>} ) {

  const resolvedSearchParams = await searchParams
  const departure = resolvedSearchParams.departure || ''
  const arrival = resolvedSearchParams.arrival || ''
  const forthDate = resolvedSearchParams.forthDate || ''
  const backDate = resolvedSearchParams.backDate || ''

  const searchQuery = {
    departure: departure,
    arrival: arrival,
    forthDate: forthDate,
    backDate: backDate
  }

  const getAll = resolvedSearchParams.all || ''

  const flightData = getFlightData()

  const departureDest = getDepartureDestinations()
  const arrivalDest = getArrivalDestinations()

  return (
    <div className="w-full min-h-[100vh]">
      <div className="p-4 w-full flex flex-col gap-4 justify-center items-center">
        
        <FlightForm departures={departureDest} arrivals={arrivalDest} />

        <FlightsAllBtn />

        <FlightLists flightData={flightData} searchQuery={searchQuery} getAll={getAll} />

      </div>
    </div>
  );
}
