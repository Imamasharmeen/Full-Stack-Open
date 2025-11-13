/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        content
        <input {...content} />
      </div>
      <div>
        author
        <input {...author} />
      </div>
      <div>
        url for more info
        <input {...info} />
      </div>
      <button type="submit">create</button>
      <button onClick={handleReset}>reset</button>
    </form>
  )
}
