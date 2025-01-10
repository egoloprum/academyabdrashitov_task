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
                <p className='text-2xl text-indigo-500 font-bold'>{ticket.price.amount} {ticket.price.currency}</p>
                <p>{ticket.airline.name}</p>
              </div>

              <div className='border-2 py-4 flex '>
                <div>
                  <p className='border-2 flex flex-col gap-2'>
                    <label>Departure</label>
                    <span>{ticket.flightInfo.departure.airport}</span>
                    <span>{ticket.flightInfo.departure.dateTime.split("T")[0]}</span>
                  </p>
                  <p className='border-2 flex flex-col gap-2'>
                    <label>Arrival</label>
                    <span>{ticket.flightInfo.arrival.airport}</span>
                    <span>{ticket.flightInfo.arrival.dateTime.split("T")[0]}</span>
                  </p>
                </div>
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
