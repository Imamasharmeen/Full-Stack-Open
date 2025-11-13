import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { setNotificationWithTimeout } from '../utils/notificationHelper'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, notifyDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      setNotificationWithTimeout(
        notifyDispatch,
        `anecdote '${newAnecdote.content}' created`,
        5
      )
    },
    onError: (error) => {
      setNotificationWithTimeout(notifyDispatch, error.message, 5)
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <form onSubmit={addAnecdote}>
      <h3>create new</h3>
      <input name='anecdote' />
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm
