// src/hooks/index.js
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // optional: a reset function (used in next steps)
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}
