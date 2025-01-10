import { FC, SetStateAction, useEffect, useState } from 'react'

interface FormDocumentProps {
  document: string
  setDocument: (value: SetStateAction<string>) => void
  setError: (isValid: boolean) => void
}

const FormDocument: FC<FormDocumentProps> = ({document, setDocument, setError}) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  useEffect(() => {
    setError(isValid)
  }, [isValid])

  useEffect(() => {
    if (!document.length) {
      setIsValid(false)
    }
  }, [document])

  const validateDocument = (value: string) => {
    const regex = /^[A-Z]\d{7}$/
    setIsValid(regex.test(value))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDocument(value)
    validateDocument(value)
  }

  return (
    <p className="flex flex-col gap-2 sm:gap-4">
      <label className="font-bold border-b">Document</label>
      <input type="text" 
        value={document}
        onChange={(e) => handleChange(e)}
        placeholder='X0000000'
        maxLength={8}
        className={`p-2 border-2 ${isValid ? 'border-gray-300' : 'border-red-500'} focus:outline-2 focus:outline-indigo-500 hover:outline-2 hover:outline-indigo-500 w-full`} />
    </p>
  )
}

export default FormDocument
