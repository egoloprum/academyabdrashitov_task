"use client"

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import FlightCard from './FlightCard'

interface FlightListsProps {
  flightData: FlightData
  searchQuery: {}
  getAll: string
}

const FlightLists: FC<FlightListsProps> = ({flightData, searchQuery, getAll}) => {
  const [flights, setFlights] = useState<FlightData>(flightData)

  const [sortByPrice, setSortByPrice] = useState<string>("ASC")
  const [sortByDuration, setSortByDuration] = useState<string>("ASC")

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

  const parseDuration = (duration: string) => {
    const [hours, minutes] = duration.split(' ').map((time) => {
      const value = parseInt(time);
      return isNaN(value) ? 0 : value
    });
    return hours * 60 + minutes
  };

  useEffect(() => {
    const sortedFlights = [...flights.tickets].sort((a, b) => {
      const durationA = parseDuration(a.flightInfo.duration)
      const durationB = parseDuration(b.flightInfo.duration)

      if (sortByDuration === "ASC") {
        return durationA - durationB
      } else {
        return durationB - durationA
      }
    });

    setFlights({ tickets: sortedFlights })
  }, [sortByDuration, flightData])

  const [checkedStates, setCheckedStates] = useState([false, false, false, false, false])

  const handleToggle = (index: number) => {
    const newCheckedStates = [...checkedStates]
    newCheckedStates[index] = !newCheckedStates[index]
    setCheckedStates(newCheckedStates)
  }

  return (
    <div className='w-full flex flex-col gap-8 mb-40'>

      <div className='flex flex-col gap-4 justify-center items-center'>

        <div className='max-w-[50rem] w-full flex flex-col'>
          <label className='mb-2 border-b text-center'>Filter by layovers</label>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            <div className='p-2 border-2 w-full flex gap-2 items-center' onClick={() => handleToggle(0)}>
              <input type="checkbox" checked={checkedStates[0]} readOnly />
              <span>All</span>
            </div>

            <div className='p-2 border-2 w-full flex gap-2 items-center' onClick={() => handleToggle(1)}>
              <input type="checkbox" checked={checkedStates[1]} readOnly />
              <span>No layovers</span>
            </div>

            <div className='p-2 border-2 w-full flex gap-2 items-center' onClick={() => handleToggle(2)}>
              <input type="checkbox" checked={checkedStates[2]} readOnly />
              <span>1 layover</span>
            </div>

            <div className='p-2 border-2 w-full flex gap-2 items-center' onClick={() => handleToggle(3)}>
              <input type="checkbox" checked={checkedStates[3]} readOnly />
              <span>2 layovers</span>
            </div>

            <div className='p-2 border-2 w-full flex gap-2 items-center' onClick={() => handleToggle(4)}>
              <input type="checkbox" checked={checkedStates[4]} readOnly />
              <span>3 layovers</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 max-w-[50rem] w-full'>
          <div className='flex flex-col w-full'>
            <label className='mb-2 border-b'>Sort by price</label>
            <select className='p-2 border-2 w-full' onChange={(e) => setSortByPrice(e.target.value)}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label className='mb-2 border-b'>Sort by duration</label>
            <select className='p-2 border-2 w-full' onChange={(e) => setSortByDuration(e.target.value)}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
      </div>

      { getAll.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          { flights.tickets.map((ticket: Ticket, index: number) => (
            <FlightCard key={index} ticket={ticket} />
          )) }
        </div>
      ) : null }
    </div>
  )
}

export default FlightLists
