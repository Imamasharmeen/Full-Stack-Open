// src/components/AnecdoteList.jsx
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filtered = anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )

    return filtered.sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map(a =>
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => dispatch(voteAnecdote(a.id))}>
              vote
            </button>
          </div>
          <br />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
