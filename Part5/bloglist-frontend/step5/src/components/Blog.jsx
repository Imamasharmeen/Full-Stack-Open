// src/components/Blog.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  // Inline styles for visual separation
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // Toggle visibility of blog details
  const toggleVisibility = () => setVisible(!visible)

  // Handle likes
  const handleLike = async () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }
    const returnedBlog = await blogService.update(blog.id, updated)
    updateBlog(returnedBlog)
  }

  // Handle blog removal
  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  // Show remove button only if current user created the blog
  const showRemove = user && blog.user && (blog.user.username === user.username)

  return (
    <div style={blogStyle} className="blog">
      {/* Blog title and author always visible */}
      <div className="blog-basic">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {/* Blog details shown only when visible */}
      {visible && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div className="blog-user">{blog.user?.name}</div>
          {showRemove && <button onClick={handleRemove}>remove</button>}
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
