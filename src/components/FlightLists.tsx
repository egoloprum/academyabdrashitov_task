"use client"

import { FC, useEffect, useState } from 'react'
import FlightCard from './FlightCard'
import FlightSorting from './FlightSorting'
import FlightFiltering from './FlightFiltering'
import { parseDuration } from '@/utils/helper'

interface FlightListsProps {
  flightData: FlightData
}

const FlightLists: FC<FlightListsProps> = ({flightData}) => {
  const [flights, setFlights] = useState<FlightData>(flightData)
  const [sortByPrice, setSortByPrice] = useState<string>("ASC")
  const [sortByDuration, setSortByDuration] = useState<string>("ASC")
  const [checkedStates, setCheckedStates] = useState<boolean[]>([true, false, false, false, false])

  useEffect(() => {
    const sortedFlights = [...flights.tickets].sort((a, b) => {
      if (sortByPrice === "ASC") {
        return a.price.amount - b.price.amount
      } else {
        return b.price.amount - a.price.amount
      }
    })

    setFlights({ tickets: sortedFlights })
  }, [sortByPrice, flightData])

  useEffect(() => {
    const sortedFlights = [...flights.tickets].sort((a, b) => {
      const durationA = parseDuration(a.flightInfo.duration)
      const durationB = parseDuration(b.flightInfo.duration)

      if (sortByDuration === "ASC") {
        return durationA - durationB
      } else {
        return durationB - durationA
      }
    })

    setFlights({ tickets: sortedFlights })
  }, [sortByDuration, flightData])

  useEffect(() => {
    const filtered = flightData.tickets.filter(ticket => {
      const layoverCount = ticket.layovers.length

      if (checkedStates[0]) { return true }
      if (checkedStates[1] && layoverCount === 0) return true
      if (checkedStates[2] && layoverCount === 1) return true
      if (checkedStates[3] && layoverCount === 2) return true
      if (checkedStates[4] && layoverCount === 3) return true

      return false
    })

    setFlights({tickets: filtered})
  }, [checkedStates, flightData])

  return (
    <div className='w-full flex flex-col gap-8 mb-40'>

      <div className='flex flex-col gap-4 justify-center items-center'>
        <FlightFiltering checkedStates={checkedStates} setCheckedStates={setCheckedStates} />
        <FlightSorting setSortByPrice={setSortByPrice} setSortByDuration={setSortByDuration} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        { flights.tickets.map((ticket: Ticket, index: number) => (
          <FlightCard key={index} ticket={ticket} />
        )) }
      </div>
    </div>
  )
}

export default FlightLists
