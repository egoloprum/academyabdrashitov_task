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
    <article className='flight_filtering_container'>
      <label className='label'>Filter by layovers</label>

      <section className=''>
        <p className='' onClick={() => handleToggle(0)}>
          <input type="checkbox" checked={checkedStates[0]} readOnly />
          <span>All</span>
        </p>

        <p className='' onClick={() => handleToggle(1)}>
          <input type="checkbox" checked={checkedStates[1]} readOnly />
          <span>0 layover</span>
        </p>

        <p className='' onClick={() => handleToggle(2)}>
          <input type="checkbox" checked={checkedStates[2]} readOnly />
          <span>1 layover</span>
        </p>

        <p className='' onClick={() => handleToggle(3)}>
          <input type="checkbox" checked={checkedStates[3]} readOnly />
          <span>2 layovers</span>
        </p>

        <p className='' onClick={() => handleToggle(4)}>
          <input type="checkbox" checked={checkedStates[4]} readOnly />
          <span>3 layovers</span>
        </p>
      </section>
    </article>
  )
}

export default FlightFiltering
