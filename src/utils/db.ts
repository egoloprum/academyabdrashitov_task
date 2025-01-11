import { faker } from '@faker-js/faker';

const TICKET_COUNT = 20

const generateFlightData = () : FlightData => {
  const tickets: Ticket[] = [];

  for (let i = 0; i < TICKET_COUNT; i++) {
    const ticket: Ticket = {
      id: faker.string.uuid(),
      price: {
        amount: parseFloat(faker.commerce.price()),
        currency: faker.finance.currencyCode(),
      },
      flightInfo: {
        departure: {
          airport: `${faker.location.city()} Airport`,
          dateTime: faker.date.future().toISOString(),
        },
        arrival: {
          airport: `${faker.location.city()} Airport`,
          dateTime: faker.date.future().toISOString(),
        },
        duration: `${faker.number.int({ min: 1, max: 12 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
      },
      layovers: generateLayovers(),
      airline: {
        name: faker.company.name(),
        code: faker.string.alpha({ length: 2 }).toUpperCase(),
      },
      dates: {
        departure: faker.date.future().toISOString(),
        return: faker.date.future().toISOString(),
      },
      class: faker.helpers.arrayElement(['economy', 'business']),
      baggage: {
        included: faker.datatype.boolean(),
        allowance: `${faker.number.int({ min: 1, max: 2 })}x${faker.number.int({ min: 20, max: 30 })}kg`,
      },
      returnToList: faker.datatype.boolean(),
    };

    tickets.push(ticket)
  }

  return { tickets }
}

const generateLayovers = () : Layover[] => {
  const layovers: Layover[] = [];
  const numberOfLayovers = faker.number.int({ min: 0, max: 3 })

  for (let j = 0; j < numberOfLayovers; j++) {
    layovers.push({
      airport: `${faker.location.city()} Airport`,
      duration: `${faker.number.int({ min: 1, max: 3 })}h`,
    })
  }

  return layovers
}

const flightData: FlightData = generateFlightData()


export const getFlightData = () : FlightData => {
  if (!flightData.tickets.length) {
    return generateFlightData()
  }
  
  return flightData
}
