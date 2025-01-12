"use client"

import { FC, SetStateAction } from 'react'

interface FlightSortingProps {
  setSortByPrice: (value: SetStateAction<string>) => void
  setSortByDuration: (value: SetStateAction<string>) => void
}

const FlightSorting: FC<FlightSortingProps> = ({setSortByPrice, setSortByDuration}) => {
  return (
    <article className='flight_sorting_container'>
      <p className=''>
        <label className='label'>Sort by price</label>
        <select className='' onChange={(e) => setSortByPrice(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </p>

      <p className=''>
        <label className='label'>Sort by duration</label>
        <select className='' onChange={(e) => setSortByDuration(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </p>
    </article>
  )
}

export default FlightSorting
