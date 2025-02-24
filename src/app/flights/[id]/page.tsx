import FlightDetailForm from "@/components/FlightDetailForm"
import { getFlightById } from "@/utils/helper"
import { ArrowRight } from "lucide-react"

interface pageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { id } = resolvedParams

  let flight = null

  try {
    flight = await getFlightById(id)
    if (!flight) { return null }  
  } catch (error) {
    console.error("Error fetching flight data:", error)
    return (
      <div>Error fetching flight data. Please try again later.</div>
    ) 
  }
  
  return (
    <main className="p-4 flex justify-center items-center">
      <article className="border-2 p-4 max-w-[50rem] w-full my-20 flex flex-col gap-4 sm:gap-8">

        <section className="flex flex-row flex-wrap border-b justify-between">
          <p className="text-2xl text-nowrap">BOARDING PASS</p>
          <p className="flex flex-wrap items-center text-end text-base sm:text-xl">
            <span>{flight?.flightInfo.departure.airport.replace(" Airport", "")}</span>
            <ArrowRight className="mx-2" />
            <span>{flight?.flightInfo.arrival.airport.replace(" Airport", "")}</span>
          </p>
        </section>

        <section className="flex flex-wrap gap-4 sm:gap-8">
          <p className="flex flex-col gap-4">
            <label className="font-bold border-b">Flight</label>
            <span>{flight?.id}</span>
          </p>
          <p className="flex flex-col gap-4">
            <label className="font-bold border-b">Departure</label>
            <span>{flight?.dates.departure.split("T")[0]}</span>
          </p>
          <p className="flex flex-col gap-4">
            <label className="font-bold border-b">Arrival</label>
            <span>{flight?.dates.return.split("T")[0]}</span>
          </p>
          <p className="flex flex-col gap-4">
            <label className="font-bold border-b">Duration</label>
            <span>{flight?.flightInfo.duration}</span>
          </p>
        </section>

        <section className="flex flex-wrap gap-4 sm:gap-8">
          <p className="flex flex-col gap-2 sm:gap-4">
            <label className="font-bold border-b">Price</label>
            <span>{flight?.price.amount} {flight?.price.currency}</span>
          </p>
          <p className="flex flex-col gap-2 sm:gap-4">
            <label className="font-bold border-b">Airline</label>
            <span>{flight?.airline.name}</span>
          </p>
          <p className="flex flex-col gap-2 sm:gap-4">
            <label className="font-bold border-b">Class</label>
            <span>{flight?.class}</span>
          </p>
          <p className="flex flex-col gap-2 sm:gap-4">
            <label className="font-bold border-b">Baggage</label>
            <span>{flight?.baggage.allowance}</span>
          </p>
        </section>

        <article className="flex flex-col gap-4">
          <section className="flex justify-between gap-2">
            <p className="flex flex-col gap-1">
              <span className="text-base sm:text-xl font-bold">{flight?.flightInfo.departure.airport.replace(" Airport", "")}</span>
              <span className="text-sm sm:text-base">{flight?.flightInfo.departure.airport}</span>
            </p>

            <p className="flex flex-col gap-1 text-center">
              <span className="text-base sm:text-xl font-bold">{flight?.flightInfo.departure.dateTime.split("T")[1].split(":").slice(0, 2).join(":")}</span>
              <span className="text-sm sm:text-base">{flight?.flightInfo.departure.dateTime.split("T")[0]}</span>
            </p>
          </section>
          { flight?.layovers.length ? (
            flight.layovers.map((layover: Layover, index:number) => (
              <p key={index} className="flex justify-between gap-2 border-l-2 px-4">
                <span className="text-sm sm:text-base">{layover.airport}</span>
                <span className="text-sm sm:text-base">{layover.duration}</span>
              </p>
            ))
          ) : null }
          <section className="flex justify-between gap-2">
            <p className="flex flex-col gap-1">
              <span className="text-base sm:text-xl font-bold">{flight?.flightInfo.arrival.airport.replace(" Airport", "")}</span>
              <span className="text-sm sm:text-base">{flight?.flightInfo.arrival.airport}</span>
            </p>

            <p className="flex flex-col gap-1 text-center">
              <span className="text-base sm:text-xl font-bold">{flight?.flightInfo.arrival.dateTime.split("T")[1].split(":").slice(0, 2).join(":")}</span>
              <span className="text-sm sm:text-base">{flight?.flightInfo.arrival.dateTime.split("T")[0]}</span>
            </p>
          </section>
        </article>

        <FlightDetailForm ticket={flight} />

      </article>
    </main>
  )
}

export default page
