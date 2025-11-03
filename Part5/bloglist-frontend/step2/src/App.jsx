import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // 🧠 Load all blogs initially
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  // 🆕 new line added — check if user already logged in from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // 🧠 handle login logic
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      // 🆕 new line added — save user info to localStorage
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      // 🆕 new line added — set token for future blog requests
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('login failed:', error)
    }
  }

  // 🆕 new line added — handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser') // clear saved user
    setUser(null) // reset state
  }

  // 🧩 Conditional rendering (if not logged in)
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

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

  // 🧩 If logged in, show user and blogs
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        {/* 🆕 new line added — logout button */}
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          logout
        </button>
      </p>

      {blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
