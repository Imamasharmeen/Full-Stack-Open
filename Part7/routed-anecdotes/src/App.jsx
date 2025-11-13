import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([...])
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => setNotification(''), 5000)

    navigate('/')   // ⬅️ redirect after creation
  }

  const padding = { paddingRight: 5 }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Notification message={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
