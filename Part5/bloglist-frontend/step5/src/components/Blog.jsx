// src/components/Blog.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }
    const returnedBlog = await blogService.update(blog.id, updated)
    updateBlog(returnedBlog)
  }

  const handleRemove = async () => {
    const ok = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (ok) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  // 🧩 show "remove" only if logged user added this blog
  const showRemove =
    user && blog.user && (blog.user.username === user.username)

  return (
    <div style={blogStyle} className="blog">
      {!visible ? (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(false)}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {showRemove && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
