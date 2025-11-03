import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification' // 🆕 new line added

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // 🆕 new state for notification
  const [notification, setNotification] = useState({ message: null, type: '' })

  // 🧠 new blog form states
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

      // 🆕 success notification
      setNotification({ message: `Welcome back, ${user.name}!`, type: 'success' })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
    } catch (error) {
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setNotification({ message: 'Logged out successfully', type: 'success' })
    setTimeout(() => setNotification({ message: null, type: '' }), 4000)
  }

  // 🆕 addBlog now shows notification
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }

      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      // 🧩 success message
      setNotification({
        message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => setNotification({ message: null, type: '' }), 4000)
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

        {/* 🧩 show notifications */}
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

      {/* 🧩 show notifications */}
      <Notification message={notification.message} type={notification.type} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>logout</button>
      </p>

      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
