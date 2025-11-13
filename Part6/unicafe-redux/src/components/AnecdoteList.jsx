import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { setNotificationWithTimeout } from '../utils/notificationHelper'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const [, notifyDispatch] = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updated.id ? updated : a))
      )

      setNotificationWithTimeout(
        notifyDispatch,
        `you voted '${updated.content}'`,
        5
      )
    }
  })

  const vote = (a) => {
    voteMutation.mutate({ ...a, votes: a.votes + 1 })
  }

  return (
    <div>
      {anecdotes.map(a => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => vote(a)}>vote</button>
          </div>
          <br />
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
