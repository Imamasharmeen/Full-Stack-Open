// src/components/Blog.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
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
      user: blog.user.id || blog.user, // user must be ID, not full object
    }

    const returnedBlog = await blogService.update(blog.id, updated)
    updateBlog(returnedBlog)
  }

  return (
    <div style={blogStyle} className="blog">
      {!visible ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
}

export default Blog
