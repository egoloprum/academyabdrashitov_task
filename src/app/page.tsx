import FlightForm from "@/components/FlightForm";
import FlightLists from "@/components/FlightLists";
import FlightsAllBtn from "@/components/FlightsAllBtn";
import { getFlightData } from "@/utils/db";
import { getArrivalDestinations, getDepartureDestinations, getFlightByQuery } from "@/utils/helper";

interface SearchParams {
  departure: string
  arrival: string
  all: string
}

export default async function Home({
  searchParams
} : {searchParams: Promise<SearchParams>} ) {

  const resolvedSearchParams = await searchParams
  const departure = resolvedSearchParams.departure || ''
  const arrival = resolvedSearchParams.arrival || ''
  
  const getAll = resolvedSearchParams.all || ''
  
  const flightData = getFlightData()  
  const departureDest = getDepartureDestinations(flightData)
  const arrivalDest = getArrivalDestinations(flightData)

  const flightSearch = getFlightByQuery(arrival, departure, flightData)
  
  return (
    <div className="w-full min-h-[100vh]">
      <div className="p-4 w-full flex flex-col gap-4 justify-center items-center">
        <FlightForm flightList={flightData} departures={departureDest} arrivals={arrivalDest} />
        <FlightsAllBtn />
        { !departure && !arrival && !getAll ? (
          null
        ) : (
          <FlightLists flightData={getAll ? flightData : flightSearch} />
        ) }
      </div>
    </div>
  );
}
