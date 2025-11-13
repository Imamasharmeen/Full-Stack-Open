// ...existing code...
const baseUrl = 'http://localhost:3001/anecdotes'

export const createNew = async content => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  })
  if (!res.ok) throw new Error('Creation failed')
  return await res.json()
}
// ...existing code...