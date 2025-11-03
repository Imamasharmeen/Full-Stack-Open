import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setNotification({
        message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({ message: 'Error creating blog', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
      console.error('Error creating blog:', error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
