"use client"

import { FC, SetStateAction } from 'react'

interface FlightSortingProps {
  setSortByPrice: (value: SetStateAction<string>) => void
  setSortByDuration: (value: SetStateAction<string>) => void
}

const FlightSorting: FC<FlightSortingProps> = ({setSortByPrice, setSortByDuration}) => {
  return (
    <article className='flex flex-col sm:flex-row gap-4 max-w-[50rem] w-full'>
      <p className='flex flex-col w-full'>
        <label className='mb-2 border-b'>Sort by price</label>
        <select className='p-2 border-2 w-full' onChange={(e) => setSortByPrice(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </p>

      <p className='flex flex-col w-full'>
        <label className='mb-2 border-b'>Sort by duration</label>
        <select className='p-2 border-2 w-full' onChange={(e) => setSortByDuration(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </p>
    </article>
  )
}

export default FlightSorting
