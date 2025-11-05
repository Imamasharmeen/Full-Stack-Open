// ✅ src/components/Blog.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
// blogService removed from handleLike during tests (mock handled externally)
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  // 🎨 Style for better readability
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // 🔄 Toggle blog detail visibility
  const toggleVisibility = () => setVisible(!visible)

  // ❤️ Handle "like" — in tests, mock `updateBlog` will handle logic
  const handleLike = async () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }

    // 🧠 Call updateBlog directly for tests (mock), skip API if no id
    if (updateBlog) {
      updateBlog(updated)
    } else {
      await blogService.update(blog.id, updated)
    }
  }

  // 🗑️ Handle blog deletion
  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  // 👀 Show remove only for blog owner
  const showRemove =
    user && blog.user && blog.user.username === user.username

  return (
    <div style={blogStyle} className="blog">
      {/* Always visible: title + author */}
      <div className="blog-basic">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {/* Conditionally visible: details */}
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

// 🧾 Prop validation
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
