"use client"

import { ArrowLeft, BookCheck } from 'lucide-react'
import { FC, useState } from 'react'
import FormBirthday from './FormBirthday'
import FormName from './FormName'
import FormDocument from './FormDocument'
import { useRouter } from 'next/navigation'

interface FlightDetailFormProps {
  ticket: Ticket | null
}

const FlightDetailForm: FC<FlightDetailFormProps> = ({ticket}) => {
  const [name, setName] = useState<string>("")
  const [birthday, setBirthday] = useState<string>("")
  const [error, setError] = useState<boolean[]>([true, true, true])
  const [document, setDocument] = useState<string>("")
  const router = useRouter()

  const updateErrorState = (index: number, isValid: boolean) => {
    const newErrorState = [...error]
    newErrorState[index] = !isValid
    setError(newErrorState)
  }

  const handleClick = () => {
    if (error.some(err => err)) {
      alert("Please fix the errors before proceeding.")
    } else {
      alert(`Flight ${ticket?.id} ticket successfully ordered by ${name}.`)
    }
  }

  const handleReturn = () => {
    router.back()
  }

  return (
    <section className="flight_detail_form_container">
      <FormName name={name} setName={setName} setError={(isValid: boolean) => updateErrorState(0, isValid)} />
      <FormBirthday birthday={birthday} setBirthday={setBirthday} setError={(isValid: boolean) => updateErrorState(1, isValid)} />
      <FormDocument document={document} setDocument={setDocument} setError={(isValid: boolean) => updateErrorState(2, isValid)} />

      <p className="">
        <label className="">Order</label>
        <button type="button" 
          onClick={() => handleClick()}
          className={`${error.some(err => err) && "button_error"}`}
        >
          <span>Done</span>
          <BookCheck />
        </button>
      </p>

      <p className="">
        <label className="">Cancel</label>
        <button type="button"
          onClick={() => handleReturn()}
          className=''
        >
          <span>Go back</span>
          <ArrowLeft />
        </button>
      </p>

    </section>
  )
}

export default FlightDetailForm
