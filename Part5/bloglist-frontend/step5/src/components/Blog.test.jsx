// src/components/Blog.test.jsx
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// Mock user and handler props
const user = {
  username: 'testuser',
  name: 'Test User'
}

const blog = {
  title: 'Testing React Components',
  author: 'Kent C. Dodds',
  url: 'https://testing-library.com/docs/',
  likes: 5,
  user: { username: 'testuser', name: 'Test User' }
}

test('renders title and author but not url or likes by default', () => {
  const { container } = render(
    <Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} user={user} />
  )

  // ✅ Title and author should be visible
  const basicDiv = container.querySelector('.blog-basic')
  expect(basicDiv).toHaveTextContent('Testing React Components')
  expect(basicDiv).toHaveTextContent('Kent C. Dodds')

  // ❌ URL and likes should NOT be visible initially
  const detailsDiv = container.querySelector('.blog-details')
  expect(detailsDiv).toBeNull()
})
