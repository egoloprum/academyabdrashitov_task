"use client"

import { FC } from 'react'
import MyLink from './MyLink'

interface FlightCardProps {
  ticket: Ticket
}

const FlightCard: FC<FlightCardProps> = ({ticket}) => {
  return (
    <MyLink href={`flights/${ticket.id}`} className='flight_card_container'>
      <section className='section_1'>
        <p className='price'>{ticket.price.amount} {ticket.price.currency}</p>
        <p className=''>{ticket.airline.name}</p>
      </section>

      <section className='section_2'>
        <p className=''>
          <label className='label'>Departure</label>
          <span className='span_airport'>{ticket.flightInfo.departure.airport}</span>
          <span className='span_time'>{ticket.flightInfo.departure.dateTime.split("T")[0]}</span>
        </p>
        <p className=''>
          <label className='label'>Arrival</label>
          <span className='span_airport'>{ticket.flightInfo.arrival.airport}</span>
          <span className='span_time'>{ticket.flightInfo.arrival.dateTime.split("T")[0]}</span>
        </p>
      </section>

      <section className='section_3'>
        <p className=''>
          <label className='label'>Duration</label>
          <span>{ticket.flightInfo.duration}</span>
        </p>
      </section>

      <section className='section_4'>
        <label className='label'>Layovers: {ticket.layovers.length}</label>
        { ticket.layovers.length ? (
          ticket.layovers.map((layover: Layover, index: number) => (
            <p key={index} className=''>
              <span>{layover.airport}</span>
              <span>{layover.duration}</span>
            </p>
          ))
        ) : (
          null
        ) }
      </section>
    </MyLink>
  )
}

export default FlightCard
