/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 10
  }

  if (!message) return null

  return <div style={style}>{message}</div>
}

export default Notification
