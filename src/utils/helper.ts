import { getFlightData } from "./db"

export const getFlightById = (id: string) => {
  const flightList = getFlightData()
  const flight = flightList.tickets.find(ticket => ticket.id === id)

  return flight || null
}

export const getDepartureDestinations = (flightList: FlightData) => {
  const uniqueDestinations = new Set<string>()

  flightList.tickets.map((ticket: Ticket) => {
    const departure = ticket.flightInfo.departure.airport

    uniqueDestinations.add(departure.replace(" Airport", ""))
  })

  return Array.from(uniqueDestinations)
}

export const getArrivalDestinations = (flightList: FlightData) => {
  const uniqueDestinations = new Set<string>()

  flightList.tickets.map((ticket: Ticket) => {
    const arrival = ticket.flightInfo.arrival.airport

    uniqueDestinations.add(arrival.replace(" Airport", ""))
  })

  return Array.from(uniqueDestinations)
}

export const getArrivalByDeparture = (departure: string, flightList: FlightData) => {
  const matchingFlights = flightList.tickets.filter(flight => flight.flightInfo.departure.airport.replace(" Airport", "") === departure)
  const arrivals = matchingFlights.map(flight => flight.flightInfo.arrival.airport.replace(" Airport", ""))

  return arrivals
}

export const getDepartureByArrival = (arrival: string, flightList: FlightData) => {
  const matchingFlights = flightList.tickets.filter(flight => flight.flightInfo.arrival.airport.replace(" Airport", "") === arrival)
  const departures = matchingFlights.map(flight => flight.flightInfo.departure.airport.replace(" Airport", ""))

  return departures
}

export const getFlightByQuery = (arrival: string, departure: string, flightList: FlightData) => {
  if (!arrival.length && !departure.length) {
    return {tickets: []} as FlightData
  }
  
  if (!arrival.length) {
    const matchingFlights = flightList.tickets.filter(flight => flight.flightInfo.departure.airport.replace(" Airport", "") === departure)
    return {tickets: matchingFlights} as FlightData
  }

  if (!departure.length) {
    const matchingFlights = flightList.tickets.filter(flight => flight.flightInfo.arrival.airport.replace(" Airport", "") === arrival)
    return {tickets: matchingFlights} as FlightData
  }

  const matchingFlights = flightList.tickets.filter(flight => 
    flight.flightInfo.arrival.airport.replace(" Airport", "") === arrival ||
    flight.flightInfo.departure.airport.replace(" Airport", "") === departure
  )
  
  console.log(matchingFlights)
  return {tickets: matchingFlights} as FlightData
}

export const parseDuration = (duration: string) => {
  const [hours, minutes] = duration.split(' ').map((time) => {
    const value = parseInt(time)
    return isNaN(value) ? 0 : value
  })
  return hours * 60 + minutes
}
