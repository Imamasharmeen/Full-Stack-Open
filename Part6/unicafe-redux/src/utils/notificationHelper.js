export const setNotificationWithTimeout = (dispatch, message, seconds = 5) => {
  dispatch({ type: 'SET', payload: message })

  setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, seconds * 1000)
}
