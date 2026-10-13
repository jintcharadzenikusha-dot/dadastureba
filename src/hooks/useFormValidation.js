import { useMemo, useState } from 'react'

const emptyForm = {
  name: '',
  comment: '',
  rating: 0,
}

export default function useFormValidation(initialValues = emptyForm) {
  const [values, setValues] = useState(initialValues)

  const errors = useMemo(() => {
    const nextErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'სახელი სავალდებულოა.'
    }

    if (values.comment.trim().length < 5) {
      nextErrors.comment = 'კომენტარი მინიმუმ 5 სიმბოლო უნდა იყოს.'
    }

    if (values.rating < 1) {
      nextErrors.rating = 'აირჩიე რეიტინგი.'
    }

    return nextErrors
  }, [values])

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const reset = () => setValues(initialValues)

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
    setField,
    reset,
  }
}
