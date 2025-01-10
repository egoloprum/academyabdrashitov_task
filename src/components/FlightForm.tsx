"use client"

import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface FlightFormProps {
  departures: string[]
  arrivals: string[]
}

const FlightForm: FC<FlightFormProps> = ({departures, arrivals}) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()
    params.set('departure', searchDeparture)
    params.set('arrival', searchArrival)

    router.replace(`${pathname}?${params.toString()}`)
  }

  const [searchDeparture, setSearchDeparture] = useState<string>("")
  const [filteredDepartures, setFilteredDepartures] = useState<string[]>(departures)
  const [showDepartureSelect, setShowDepartureSelect] = useState(false)

  const [searchArrival, setSearchArrival] = useState<string>("")
  const [filteredArrivals, setFilteredArrivals] = useState<string[]>(arrivals)
  const [showArrivalSelect, setShowArrivalSelect] = useState(false)

  useEffect(() => {
    setFilteredDepartures(departures.filter(dest => 
      dest.toLowerCase().includes(searchDeparture.toLowerCase())
    ))
  }, [searchDeparture])

  useEffect(() => {
    setFilteredArrivals(arrivals.filter(arriv => 
      arriv.toLowerCase().includes(searchArrival.toLowerCase())
    ))
  }, [searchArrival])

  return (
    <form onSubmit={(e) => handleSearch && handleSearch(e)} className='border-2 max-w-[1000px] mt-20 w-full flex flex-row'>

      <div className='basis-1/5 focus:outline-2 focus:outline-red-500 hover:outline-2 hover:outline-red-500 text-black border-2 relative'>
        <label>Departure</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchDeparture}
          onChange={(e) => setSearchDeparture(e.target.value)}
          onFocus={() => setShowDepartureSelect(true)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        
        {showDepartureSelect ? (
          <select
            className='p-2 w-full absolute -bottom-10 left-0 border-2 border-red-500 z-10'
            value=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSearchDeparture(selectedValue);
              if (selectedValue) { setShowDepartureSelect(false); }
            }}
          >
            {filteredDepartures.map((dest, index) => (
              <option key={index} value={dest}>{dest}</option>
            ))}
            <option value="" disabled>Select a departure</option>
          </select>
        ) : null}
      </div>

      <div className='basis-1/5 focus:outline-2 focus:outline-red-500 hover:outline-2 hover:outline-red-500 text-black border-2 relative'>
        <label>Arrival</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchArrival}
          onChange={(e) => setSearchArrival(e.target.value)}
          onFocus={() => setShowArrivalSelect(true)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        
        {showArrivalSelect ? (
          <select
            className='p-2 w-full absolute -bottom-10 left-0 border-2 border-red-500 z-10'
            value=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSearchArrival(selectedValue);
              if (selectedValue) { setShowArrivalSelect(false); }
            }}
          >
            {filteredArrivals.map((dest, index) => (
              <option key={index} value={dest}>{dest}</option>
            ))}
            <option value="" disabled>Select an arrival</option>
          </select>
        ) : null}
      </div>

      <div className='basis-1/5 focus:outline-2 focus:outline-red-500 hover:outline-2 hover:outline-red-500 text-black border-2'>
        <label className=''>Forth</label>
        <input type="text" className='p-2 border border-gray-300 rounded w-full' placeholder='dd/mm/yyyy' />
      </div>
      
      <div className='basis-1/5 focus:outline-2 focus:outline-red-500 hover:outline-2 hover:outline-red-500 text-black border-2'>
        <label className=''>Back</label>
        <input type="text" className='p-2 border border-gray-300 rounded w-full' placeholder='dd/mm/yyyy' />
      </div>

      <div className='basis-1/5 text-black border-2'>
        <label className=''>Go on</label>
        <button type='submit' className='p-2 border border-gray-300 rounded w-full'>
          Find
        </button>
      </div>

    </form>
  )
}

export default FlightForm
