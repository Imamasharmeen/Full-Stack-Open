import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a,b) => b.votes - a.votes)
  )

  return (
    <div>
      {anecdotes.map(a =>
        <div key={a.id}>
          {a.content}
          <div>
            has {a.votes}
            <button 
              onClick={() => {
                dispatch(voteAnecdote(a))     // ✔ vote update
                dispatch(setNotification(`you voted '${a.content}'`, 5)) // ✔ notification
              }}
            >
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
