// ...existing code...
const baseUrl = 'http://localhost:3001/anecdotes'

export const updateAnecdote = async (id, updated) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  })
  if (!res.ok) throw new Error('Update failed')
  return await res.json()
}
