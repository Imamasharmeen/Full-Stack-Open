// ✅ src/components/BlogForm.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// 🧪 Ensure BlogForm calls handler with correct data
test('<BlogForm /> calls event handler with correct details', async () => {
  const createBlog = vi.fn() // mock handler
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // find input fields by placeholder
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const createButton = screen.getByText('create')

  // simulate typing and submission
  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Jane Doe')
  await user.type(urlInput, 'https://example.com')
  await user.click(createButton)

  // ✅ verify handler call and data correctness
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog Title',
    author: 'Jane Doe',
    url: 'https://example.com',
  })
})
