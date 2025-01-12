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

    if (value) {
      setFilteredArrivals(getArrivalByDeparture(value, flightList))
    }
  }

  const handleSelectArrival = (value: string) => {
    setSearchArrival(value)
    setShowArrivalSelect(false)

    if (value) {
      setFilteredDepartures(getDepartureByArrival(value, flightList))
    }
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
    <form onSubmit={(e) => handleSearch && handleSearch(e)} className='flight_form_container'>
      <fieldset className='fieldset'>
        <label className='label'>Departure</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchDeparture}
          onChange={(e) => {
            setSearchDeparture(e.target.value)
            setShowDepartureSelect(true)
          }}
          onFocus={() => setShowDepartureSelect(true)}
          className="input"
        />
        
        {showDepartureSelect && (
          <div className="dropdown">
            <div 
              className='dismiss'
              onClick={() => handleSelectDeparture("")}
            >
              Dismiss
            </div>
            {filteredDepartures.length > 0 ? (
              filteredDepartures.map((dest, index) => (
                <div
                  key={index}
                  className="dismiss"
                  onClick={() => handleSelectDeparture(dest)}
                >
                  {dest}
                </div>
              ))
            ) : (
              <div className="not_found" onClick={ () => handleSelectDeparture("") }>No options available</div>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className='fieldset'>
        <label className='label'>Arrivals</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchArrival}
          onChange={(e) => {
            setSearchArrival(e.target.value)
            setShowArrivalSelect(true)
          }}
          onFocus={() => setShowArrivalSelect(true)}
          className="input"
        />
        
        {showArrivalSelect && (
          <div className="dropdown">
            <div 
              className='dismiss'
              onClick={() => handleSelectArrival("")}
            >
              Dismiss
            </div>
            {filteredArrivals.length > 0 ? (
              filteredArrivals.map((arriv, index) => (
                <div
                  key={index}
                  className="dismiss"
                  onClick={() => handleSelectArrival(arriv)}
                >
                  {arriv}
                </div>
              ))
            ) : (
              <div className="not_found" onClick={ () => handleSelectArrival("") }>No options available</div>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className='fieldset'>
        <label className='label'>Search flight</label>
        <button type='submit' className='button'>
          Find
        </button>
      </fieldset>
    </form>
  )
}

export default FlightForm
