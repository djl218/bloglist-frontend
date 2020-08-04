import React, { useState } from 'react'

const Blog = ({ user, blog, addOneLike, deleteBlogInfo }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setBlogInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setBlogInfoVisible(false)}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes}
            <button onClick={addOneLike}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            <button onClick={deleteBlogInfo}>remove</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setBlogInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setBlogInfoVisible(false)}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes}
            <button onClick={addOneLike}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog
