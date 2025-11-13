// src/reducer.js

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        good: state.good + 1, // increment good
      }
    case 'OK':
      return {
        ...state,
        ok: state.ok + 1, // increment ok
      }
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1, // increment bad
      }
    case 'RESET':
      return {
        good: 0,
        ok: 0,
        bad: 0, // reset all
      }
    default:
      return state // return unchanged
  }
}

export default counterReducer
export { initialState }
