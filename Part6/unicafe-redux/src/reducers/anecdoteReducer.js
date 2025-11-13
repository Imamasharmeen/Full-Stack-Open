import { createSlice } from '@reduxjs/toolkit'
import { updateAnecdote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updated = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const saved = await updateAnecdote(anecdote.id, updated)
    dispatch(updateVote(saved))
  }
}

export default anecdoteSlice.reducer
