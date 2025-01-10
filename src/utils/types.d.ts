interface Baggage {
  included: boolean;
  allowance: string;
}

interface Layover {
  airport: string;
  duration: string;
}

interface FlightInfo {
  departure: {
    airport: string;
    dateTime: string;
  };
  arrival: {
    airport: string;
    dateTime: string;
  };
  duration: string;
}

interface Airline {
  name: string;
  code: string;
}

interface Ticket {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  flightInfo: FlightInfo;
  layovers: Layover[];
  airline: Airline;
  dates: {
    departure: string;
    return: string;
  };
  class: string;
  baggage: Baggage;
  returnToList: boolean;
}

interface FlightData {
  tickets: Ticket[];
}
