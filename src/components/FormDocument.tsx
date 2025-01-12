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
    <p className="form_order">
      <label className="">Document</label>
      <input type="text" 
        value={document}
        onChange={(e) => handleChange(e)}
        placeholder='X0000000'
        maxLength={8}
        className={`${isValid ? 'input_gray' : 'input_red'}`}
      />
    </p>
  )
}

export default FormDocument
