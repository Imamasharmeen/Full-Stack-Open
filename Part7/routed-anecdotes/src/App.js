import { useState } from 'react'
import { useCountry } from './hooks'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  const { data } = country

  return (
    <div>
      <h3>{data.name.common}</h3>
      <div>capital {data.capital}</div>
      <div>population {data.population}</div>
      <img src={data.flags.png} height='100' alt={`flag of ${data.name.common}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(e.target.country.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input name='country' />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
