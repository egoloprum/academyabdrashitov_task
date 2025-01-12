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
    <main className="flight_detail_container flex_center">
      <article className="flight_detaim_article">

        <section className="flight_detail_section_1">
          <p className="boarding_pass">BOARDING PASS</p>
          <p className="destination">
            <span>{flight?.flightInfo.departure.airport.replace(" Airport", "")}</span>
            <ArrowRight className="mx-2" />
            <span>{flight?.flightInfo.arrival.airport.replace(" Airport", "")}</span>
          </p>
        </section>

        <section className="flight_detail_section_2">
          <p className="">
            <label className="">Flight</label>
            <span>{flight?.id}</span>
          </p>
          <p className="">
            <label className="">Departure</label>
            <span>{flight?.dates.departure.split("T")[0]}</span>
          </p>
          <p className="">
            <label className="">Arrival</label>
            <span>{flight?.dates.return.split("T")[0]}</span>
          </p>
          <p className="">
            <label className="">Duration</label>
            <span>{flight?.flightInfo.duration}</span>
          </p>
        </section>

        <section className="flight_detail_section_3">
          <p className="">
            <label className="">Price</label>
            <span>{flight?.price.amount} {flight?.price.currency}</span>
          </p>
          <p className="">
            <label className="">Airline</label>
            <span>{flight?.airline.name}</span>
          </p>
          <p className="">
            <label className="">Class</label>
            <span>{flight?.class}</span>
          </p>
          <p className="">
            <label className="">Baggage</label>
            <span>{flight?.baggage.allowance}</span>
          </p>
        </section>

        <article className="flight_detail_article_2">
          <section className="">
            <p className="flight_detail_article_2_p_1">
              <span className="flight_detail_article_2_p_span">{flight?.flightInfo.departure.airport.replace(" Airport", "")}</span>
              <span className="flight_detail_article_2_p_span_2">{flight?.flightInfo.departure.airport}</span>
            </p>

            <p className="flight_detail_article_2_p_1 flight_detail_article_2_p_2">
              <span className="flight_detail_article_2_p_span">{flight?.flightInfo.departure.dateTime.split("T")[1].split(":").slice(0, 2).join(":")}</span>
              <span className="flight_detail_article_2_p_span_2">{flight?.flightInfo.departure.dateTime.split("T")[0]}</span>
            </p>
          </section>
          { flight?.layovers.length ? (
            flight.layovers.map((layover: Layover, index:number) => (
              <p key={index} className="flight_detail_layovers">
                <span className="flight_detail_article_2_p_span_2">{layover.airport}</span>
                <span className="flight_detail_article_2_p_span_2">{layover.duration}</span>
              </p>
            ))
          ) : null }
          <section className="">
            <p className="flight_detail_article_2_p_1">
              <span className="flight_detail_article_2_p_span">{flight?.flightInfo.arrival.airport.replace(" Airport", "")}</span>
              <span className="flight_detail_article_2_p_span_2">{flight?.flightInfo.arrival.airport}</span>
            </p>

            <p className="flight_detail_article_2_p_1 flight_detail_article_2_p_2">
              <span className="flight_detail_article_2_p_span">{flight?.flightInfo.arrival.dateTime.split("T")[1].split(":").slice(0, 2).join(":")}</span>
              <span className="flight_detail_article_2_p_span_2">{flight?.flightInfo.arrival.dateTime.split("T")[0]}</span>
            </p>
          </section>
        </article>

        <FlightDetailForm ticket={flight} />

      </article>
    </main>
  )
}

export default page
