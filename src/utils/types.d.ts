interface Ticket {
  id: string

  price: {
    amount: number
    currency: string
  }

  flightInfo: {
    departure: {
      airport: string
      dateTime: string
    }
    arrival: {
      airport: string
      dateTime: string
    }
    duration: string
  }

  layovers: {
    airport: string
    duration: string
  }[]

  airline: {
    name: string
    code: string
  }

  dates: {
    departure: string
    return: string
  }

  class: string
  baggage: {
    included: boolean
    allowance: string
  }
  returnToList: boolean
}

interface FlightData {
  tickets: Ticket[]
}
