import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') return state.anecdotes
    return state.anecdotes.filter(a =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  return (
    <div>
      {anecdotes.map(a =>
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => dispatch(voteAnecdote(a))}>vote</button>

          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
