"use client"

import { getArrivalByDeparture, getDepartureByArrival } from '@/utils/helper'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface FlightFormProps {
  flightList: FlightData
  departures: string[]
  arrivals: string[]
}

const FlightForm: FC<FlightFormProps> = ({flightList, departures, arrivals}) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()
    if (searchDeparture) {
      params.set('departure', searchDeparture)
    }
    if (searchArrival) {
      params.set('arrival', searchArrival)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const [searchDeparture, setSearchDeparture] = useState<string>("")
  const [filteredDepartures, setFilteredDepartures] = useState<string[]>(departures)
  const [showDepartureSelect, setShowDepartureSelect] = useState(false)

  const [searchArrival, setSearchArrival] = useState<string>("")
  const [filteredArrivals, setFilteredArrivals] = useState<string[]>(arrivals)
  const [showArrivalSelect, setShowArrivalSelect] = useState(false)

  const handleSelectDeparture = (value: string) => {
    setSearchDeparture(value)
    setShowDepartureSelect(false)

    setFilteredArrivals(getArrivalByDeparture(value, flightList))
  }

  const handleSelectArrival = (value: string) => {
    setSearchArrival(value)
    setShowArrivalSelect(false)

    setFilteredDepartures(getDepartureByArrival(value, flightList))
  }

  useEffect(() => {
    setFilteredDepartures(departures.filter(dest => 
      dest.toLowerCase().includes(searchDeparture.toLowerCase())
    ))

    if (searchDeparture.length) {
      setFilteredArrivals(getArrivalByDeparture(searchDeparture, flightList))
    }

  }, [searchDeparture])

  useEffect(() => {
    setFilteredArrivals(arrivals.filter(arriv => 
      arriv.toLowerCase().includes(searchArrival.toLowerCase())
    ))

    if (searchArrival) {
      setFilteredDepartures(getDepartureByArrival(searchArrival, flightList))
    }

  }, [searchArrival])

  return (
    <form onSubmit={(e) => handleSearch && handleSearch(e)} className='max-w-[1000px] mt-40 w-full flex flex-col sm:flex-row gap-4'>
      <div className='basis-1/3 flex flex-col text-black relative'>
        <label className='mb-2 border-b'>Departure</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchDeparture}
          onChange={(e) => {
            setSearchDeparture(e.target.value)
            setShowDepartureSelect(true)
          }}
          onFocus={() => setShowDepartureSelect(true)}
          className="p-2 border-2 focus:outline-2 focus:outline-indigo-500 hover:outline-2 hover:outline-indigo-500 w-full"
        />
        
        {showDepartureSelect && (
          <div className="absolute top-20 left-0 w-full max-h-32 overflow-y-auto border-2 z-10 bg-white">
            <div 
              className='p-2 hover:bg-gray-200 cursor-pointer'
              onClick={() => handleSelectDeparture("")}
            >
              Dismiss
            </div>
            {filteredDepartures.length > 0 ? (
              filteredDepartures.map((dest, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectDeparture(dest)}
                >
                  {dest}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500" onClick={ () => handleSelectDeparture("") }>No options available</div>
            )}
          </div>
        )}
      </div>

      <div className='basis-1/3 flex flex-col text-black relative'>
        <label className='mb-2 border-b'>Arrivals</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchArrival}
          onChange={(e) => {
            setSearchArrival(e.target.value)
            setShowArrivalSelect(true)
          }}
          onFocus={() => setShowArrivalSelect(true)}
          className="p-2 border-2 focus:outline-2 focus:outline-indigo-500 hover:outline-2 hover:outline-indigo-500 w-full"
        />
        
        {showArrivalSelect && (
          <div className="absolute top-20 left-0 w-full max-h-32 overflow-y-auto border-2 z-10 bg-white">
            <div 
              className='p-2 hover:bg-gray-200 cursor-pointer'
              onClick={() => handleSelectArrival("")}
            >
              Dismiss
            </div>
            {filteredArrivals.length > 0 ? (
              filteredArrivals.map((arriv, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectArrival(arriv)}
                >
                  {arriv}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500" onClick={ () => handleSelectArrival("") }>No options available</div>
            )}
          </div>
        )}
      </div>

      <div className='basis-1/3 flex flex-col text-black'>
        <label className='mb-2 border-b'>Search flight</label>
        <button type='submit' className='p-2 border border-gray-300 w-full'>
          Find
        </button>
      </div>
    </form>
  )
}

export default FlightForm
