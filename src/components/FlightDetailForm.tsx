"use client"

import { BookCheck } from 'lucide-react'
import { FC, useState } from 'react'
import FormBirthday from './FormBirthday'
import FormName from './FormName'
import FormDocument from './FormDocument'

interface FlightDetailFormProps {
  ticket: Ticket | null
}

const FlightDetailForm: FC<FlightDetailFormProps> = ({ticket}) => {
  const [name, setName] = useState<string>("")
  const [birthday, setBirthday] = useState<string>("")
  const [error, setError] = useState<boolean[]>([true, true, true])
  const [document, setDocument] = useState<string>("")

  const updateErrorState = (index: number, isValid: boolean) => {
    const newErrorState = [...error]
    newErrorState[index] = !isValid
    setError(newErrorState)
  }

  const handleClick = () => {
    console.log("click")
    if (error.some(err => err)) {
      alert("Please fix the errors before proceeding.");
    } else {
      alert(`Flight ${ticket?.id} ticket successfully ordered by ${name}.`);
    }
  }

  return (
    <div className="flex flex-wrap gap-4 sm:gap-8">
      <FormName name={name} setName={setName} setError={(isValid: boolean) => updateErrorState(0, isValid)} />
      <FormBirthday birthday={birthday} setBirthday={setBirthday} setError={(isValid: boolean) => updateErrorState(1, isValid)} />
      <FormDocument document={document} setDocument={setDocument} setError={(isValid: boolean) => updateErrorState(2, isValid)} />

      <p className="flex flex-col gap-2 sm:gap-4">
        <label className="font-bold border-b">Order</label>
        <button type="button" 
          onClick={() => handleClick()}
          className={`${error.some(err => err) && "bg-red-500"} p-2 px-8 border-2 flex items-center gap-2 w-full`}
        >
          <span>Done</span>
          <BookCheck />
        </button>
      </p>
    </div>
  )
}

export default FlightDetailForm
