import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import { Provider } from 'react-redux'
import store from './store'

const AppContent = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 1,
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
    },
    {
      id: 2,
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
    },
  ])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `A new anecdote "${anecdote.content}" created!`,
    })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)

    navigate('/')
  }

  const padding = { paddingRight: 5 }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>

      <Notification />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>

      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App