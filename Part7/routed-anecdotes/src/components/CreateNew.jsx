import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
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
        <input {...content.inputProps} />
      </div>
      <div>
        author
        <input {...author.inputProps} />
      </div>
      <div>
        url for more info
        <input {...info.inputProps} />
      </div>
      <button type="submit">create</button>
      <button onClick={handleReset}>reset</button>
    </form>
  )
}
