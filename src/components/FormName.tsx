"use client"

import { FC, SetStateAction, useEffect, useState } from 'react'

interface FormNameProps {
  name: string
  setName: (value: SetStateAction<string>) => void
  setError: (isValid: boolean) => void
}

const FormName: FC<FormNameProps> = ({name, setName, setError}) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  useEffect(() => {
    setError(isValid)
  }, [isValid])

  useEffect(() => {
    if (!name.length) {
      setIsValid(false)
    }
    else {
      setIsValid(true)
    }
  }, [name])

  return (
    <p className="form_order">
      <label className="">Full Name</label>
      <input type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Jon Jones'
        className={`${isValid ? 'input_gray' : 'input_red'}`}
      />
    </p>
  )
}

export default FormName
