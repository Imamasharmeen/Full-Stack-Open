const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error('Failed to fetch anecdotes')
  return await res.json()
}
