// src/reducers/anecdoteReducer.js

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = content => {
  return {
    content,
    id: generateId(),
    votes: 0
  }
}

const initialState = initialAnecdotes.map(asObject)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: generateId(),
      votes: 0
    }
  }
}

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const anecdote = state.find(a => a.id === id)
      const changed = { ...anecdote, votes: anecdote.votes + 1 }
      return state
        .map(a => a.id !== id ? a : changed)
        .sort((a, b) => b.votes - a.votes)
    }

    case 'NEW_ANECDOTE':
      return [...state, action.payload]

    default:
      return state
  }
}

export default anecdoteReducer
