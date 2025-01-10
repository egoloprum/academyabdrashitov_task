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
    <p className="flex flex-col gap-2 sm:gap-4">
      <label className="font-bold border-b">Full Name</label>
      <input type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Jon Jones'
        className={`p-2 border-2 ${isValid ? 'border-gray-300' : 'border-red-500'} focus:outline-2 focus:outline-indigo-500 hover:outline-2 hover:outline-indigo-500 w-full`}
      />
    </p>
  )
}

export default FormName
