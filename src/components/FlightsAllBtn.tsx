"use client"

import { usePathname, useRouter } from 'next/navigation'

const FlightsAllBtn = ({}) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const params = new URLSearchParams()
    params.set('all', "true")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit && handleSubmit(e)}>
      <button className='flights_all_button'>
        See all flights
      </button>
    </form>
  )
}

export default FlightsAllBtn
