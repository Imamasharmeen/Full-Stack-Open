import { useState } from 'react'

// Button Component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// StatisticLine Component (Table row)
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// Statistics Component
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average.toFixed(1)} />
          <StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
        </tbody>
      </table>
    </div>
  )
}

// App Component
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
