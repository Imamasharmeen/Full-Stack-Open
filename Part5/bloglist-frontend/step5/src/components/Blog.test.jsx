// ✅ src/components/Blog.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
  const basicDiv = container.querySelector('.blog-basic')
  expect(basicDiv).toHaveTextContent('Testing React Components')
  expect(basicDiv).toHaveTextContent('Kent C. Dodds')

  const detailsDiv = container.querySelector('.blog-details')
  expect(detailsDiv).toBeNull()
})

test('shows url and likes when view button clicked', async () => {
  const { container } = render(
    <Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} user={user} />
  )
  const userSim = userEvent.setup() // simulate user
  const button = screen.getByText('view') // find view button
  await userSim.click(button) // simulate click

  const detailsDiv = container.querySelector('.blog-details')
  expect(detailsDiv).toHaveTextContent('https://testing-library.com/docs/')
  expect(detailsDiv).toHaveTextContent('likes 5')
})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = vi.fn() // create mock handler
  render(
    <Blog blog={blog} updateBlog={mockHandler} removeBlog={() => {}} user={user} />
  )

  const userSim = userEvent.setup() // simulate user
  const viewButton = screen.getByText('view') // show details first
  await userSim.click(viewButton)

  const likeButton = screen.getByText('like') // find like button
  await userSim.click(likeButton) // first click
  await userSim.click(likeButton) // second click

  expect(mockHandler.mock.calls).toHaveLength(2) // check handler called twice
})
