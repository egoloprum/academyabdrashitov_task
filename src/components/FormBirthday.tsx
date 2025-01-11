"use client"

import React, { FC, SetStateAction, useEffect, useState } from 'react'

interface FormBirthdayProps {
  birthday: string
  setBirthday: (value: SetStateAction<string>) => void
  setError: (isValid: boolean) => void
}

const FormBirthday: FC<FormBirthdayProps> = ({ birthday, setBirthday, setError }) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length >= 2) {
      value = value.slice(0, 2) + (value.length > 2 ? '/' : '') + value.slice(2)
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + (value.length > 5 ? '/' : '') + value.slice(5)
    }

    if (value.length > 10) {
      value = value.slice(0, 10)
    }

    setBirthday(value)
    validateDate(value)
  }

  const validateDate = (dateString: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
    if (!regex.test(dateString)) {
      setIsValid(false)
      return
    }

    const [day, month, year] = dateString.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    const minDate = new Date(1900, 0, 1)
    const maxDate = new Date()
    
    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date >= minDate &&
      date <= maxDate
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  useEffect(() => {
    setError(isValid)
  }, [isValid])

  useEffect(() => {
    if (!birthday.length) {
      setIsValid(false)
    }
  }, [birthday])

  return (
    <p className="flex flex-col gap-2 sm:gap-4">
      <label className="font-bold border-b">Birthday</label>
      <input
        type="text"
        value={birthday}
        onChange={handleBirthday}
        placeholder='dd/mm/yyyy'
        maxLength={10}
        className={`p-2 border-2 ${isValid ? 'border-gray-300' : 'border-red-500'} focus:outline-2 focus:outline-indigo-500 hover:outline-2 hover:outline-indigo-500 w-full`}
      />
    </p>
  )
}

export default FormBirthday
