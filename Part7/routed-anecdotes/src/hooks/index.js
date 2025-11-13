import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // this object will be spread into the <input>
  const inputProps = {
    type,
    value,
    onChange
  }

  return {
    inputProps,
    reset
  }
}
