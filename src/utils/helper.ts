import { getFlightData } from "./db"

export const getDepartureDestinations = () => {
  const FlightList = getFlightData()
  const uniqueDestinations = new Set<string>()

  FlightList.tickets.map((ticket: Ticket) => {
    const departure = ticket.flightInfo.departure.airport

    uniqueDestinations.add(departure.replace(" Airport", ""))
  })

  return Array.from(uniqueDestinations)
}

export const getArrivalDestinations = () => {
  const FlightList = getFlightData()
  const uniqueDestinations = new Set<string>()

  FlightList.tickets.map((ticket: Ticket) => {
    const arrival = ticket.flightInfo.arrival.airport

    uniqueDestinations.add(arrival.replace(" Airport", ""))
  })

  return Array.from(uniqueDestinations)
}

export const parseDuration = (duration: string) => {
  const [hours, minutes] = duration.split(' ').map((time) => {
    const value = parseInt(time)
    return isNaN(value) ? 0 : value
  })
  return hours * 60 + minutes
}
