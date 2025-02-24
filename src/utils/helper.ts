export const getFlightById = async (id: string): Promise<Ticket | null> => {
  try {
    const API_URL = process.env.NODE_ENV === 'production' 
    ? process.env.URL_PRODUCTION 
    : process.env.URL_DEVELOPMENT
    
    const response = await fetch(`${API_URL}/api/flights`, { cache: 'force-cache' })
    const flightList = await response.json() as FlightData

    const flight = flightList.tickets.find(ticket => ticket.id === id)
    return flight || null
  } catch (error) {
    console.error("Error in getFlightById:", error)
    return null
  }
}

export const getDepartureDestinations = (flightList: FlightData) => {
  const departures = [] as string[]

  flightList.tickets.map((ticket: Ticket) => {
    const departure = ticket.flightInfo.departure.airport

    departures.push(departure.replace(" Airport", ""))
  })

  return departures
}

export const getArrivalDestinations = (flightList: FlightData) => {
  const arrivals = [] as string[]

  flightList.tickets.map((ticket: Ticket) => {
    const arrival = ticket.flightInfo.arrival.airport

    arrivals.push(arrival.replace(" Airport", ""))
  })

  return arrivals
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
  
  return {tickets: matchingFlights} as FlightData
}

export const parseDuration = (duration: string) => {
  const [hours, minutes] = duration.split(' ').map((time) => {
    const value = parseInt(time)
    return isNaN(value) ? 0 : value
  })
  return hours * 60 + minutes
}
