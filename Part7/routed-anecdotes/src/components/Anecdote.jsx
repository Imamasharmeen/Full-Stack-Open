/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((a) => a.id === Number(id))

  // eslint-disable-next-line prettier/prettier
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Author: {anecdote.author}</div>
      <div>
        Info: <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  )
}

export default Anecdote
