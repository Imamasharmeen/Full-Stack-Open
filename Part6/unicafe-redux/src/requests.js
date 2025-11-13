const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) {
    throw new Error('anecdote service not available due to problems in server')
  }
  return await res.json()
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error('too short anecdote')
  }

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  })

  if (!res.ok) {
    throw new Error('failed to create anecdote')
  }

  return await res.json()
}

export const updateAnecdote = async (updated) => {
  const res = await fetch(`${baseUrl}/${updated.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  })

  if (!res.ok) {
    throw new Error('failed to update anecdote')
  }

  return await res.json()
}
