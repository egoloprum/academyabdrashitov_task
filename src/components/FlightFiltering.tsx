import { FC, SetStateAction } from 'react'

interface FlightFilteringProps {
  checkedStates: boolean[]
  setCheckedStates: (value: SetStateAction<boolean[]>) => void
}

const FlightFiltering: FC<FlightFilteringProps> = ({checkedStates, setCheckedStates}) => {
  const handleToggle = (index: number) => {
    const newCheckedStates = [...checkedStates]
    newCheckedStates[index] = !newCheckedStates[index]
    setCheckedStates(newCheckedStates)
  }

  return (
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
  )
}

export default FlightFiltering
