"use client"

import Link from 'next/link'
import { FC, useState } from 'react'

interface FlightListsProps {
  flightData: FlightData
  searchQuery: {}
  getAll: string
}

const FlightLists: FC<FlightListsProps> = ({flightData, searchQuery, getAll}) => {
  const [flights, setFlights] = useState<FlightData | null>(flightData)

  return (
    <div className='border-2 w-full p-4'>
      flightLists

      { getAll.length ? (
        <div className='border-2 p-4 flex flex-wrap gap-4'>
          { flightData.tickets.map((ticket: Ticket, index: number) => (
            <Link href={`flights/${ticket.id}`} key={index} className='border-2 p-4 max-w-[30rem] w-full'>
              <div className='flex items-center justify-between'>
                <p className='basis-1/2 text-2xl text-indigo-500 font-bold'>{ticket.price.amount} {ticket.price.currency}</p>
                <p className='basis-1/2 '>{ticket.airline.name}</p>
              </div>

              <div className='flex'>
                  <p className='py-4 flex basis-1/2 flex-col'>
                    <label className='mb-2 border-b'>Departure</label>
                    <span className='mb-2'>{ticket.flightInfo.departure.airport}</span>
                    <span className='mt-auto'>{ticket.flightInfo.departure.dateTime.split("T")[0]}</span>
                  </p>
                  <p className='py-4 flex basis-1/2 flex-col'>
                    <label className='mb-2 border-b'>Arrival</label>
                    <span className='mb-2'>{ticket.flightInfo.arrival.airport}</span>
                    <span className='mt-auto'>{ticket.flightInfo.arrival.dateTime.split("T")[0]}</span>
                  </p>
              </div>

              <div className='flex flex-col w-full'>
                <label className='mb-2 border-b w-full'>Layovers: {ticket.layovers.length}</label>
                { ticket.layovers.length ? (
                  ticket.layovers.map((layover: Layover, index: number) => (
                    <p key={index} className='flex gap-2'>
                      <span>{layover.airport}</span>
                      <span>{layover.duration}</span>
                    </p>
                  ))
                ) : (
                  null
                ) }
              </div>


            </Link>
          )) }
        </div>
      ) : null }

      <div className='border-2 p-4'>
        
      </div>
    </div>
  )
}

export default FlightLists
