import { createStore } from 'redux'

const initialState = {
  notification: '',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: '',
      }
    default:
      return state
  }
}

const store = createStore(notificationReducer)

export default store
