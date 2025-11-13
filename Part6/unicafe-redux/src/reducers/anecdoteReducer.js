import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [
  {
    content: 'If it hurts, do it more often',
    id: getId(),
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: getId(),
    votes: 0
  }
]

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(a =>
        a.id !== id ? a : { ...a, votes: a.votes + 1 }
      )
    },
    addAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
