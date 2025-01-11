"use client"

import { FC } from 'react'
import MyLink from './MyLink'

interface FlightCardProps {
  ticket: Ticket
}

const FlightCard: FC<FlightCardProps> = ({ticket}) => {
  return (
    <MyLink href={`flights/${ticket.id}`} className='border-2 p-4 w-full'>
      <section className='flex gap-2 items-center justify-between'>
        <p className='basis-1/2 text-2xl text-indigo-500 font-bold'>{ticket.price.amount} {ticket.price.currency}</p>
        <p className='basis-1/2 '>{ticket.airline.name}</p>
      </section>

      <section className='py-2 flex flex-wrap gap-2'>
        <p className='flex flex-col'>
          <label className='mb-2 border-b'>Departure</label>
          <span className='mb-2'>{ticket.flightInfo.departure.airport}</span>
          <span className='mt-auto'>{ticket.flightInfo.departure.dateTime.split("T")[0]}</span>
        </p>
        <p className='flex flex-col'>
          <label className='mb-2 border-b'>Arrival</label>
          <span className='mb-2'>{ticket.flightInfo.arrival.airport}</span>
          <span className='mt-auto'>{ticket.flightInfo.arrival.dateTime.split("T")[0]}</span>
        </p>
      </section>

      <section>
        <p className='py-2 flex basis-1/2 flex-col'>
          <label className='mb-2 border-b'>Duration</label>
          <span>{ticket.flightInfo.duration}</span>
        </p>
      </section>

      <section className='flex flex-wrap flex-col w-full'>
        <label className='mb-2 border-b w-full'>Layovers: {ticket.layovers.length}</label>
        { ticket.layovers.length ? (
          ticket.layovers.map((layover: Layover, index: number) => (
            <p key={index} className='flex flex-wrap gap-2'>
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
