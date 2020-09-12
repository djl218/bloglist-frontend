import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addOneLike, deleteBlogInfoFor } from '../reducers/blogReducer'

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

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} className="defaultBlogDisplay">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          <button id='viewButton' onClick={() => setBlogInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible} className="blogDisplayAfterClick">
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            <button onClick={() => setBlogInfoVisible(false)}>hide</button>
          </div>
          <div>
          <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="numberOfLikes">
            {blog.likes} likes
            <button id='likeButton' onClick={addOneLike}>like</button>
          </div>
          <div>
            added by {blog.user.name}
          </div>
          <div>
            {
              user.username === blog.user.username
              ? <button id='deleteButton' onClick={deleteBlogInfo}>remove</button>
              : null
            }
          </div>
        </div>
      </div>
    )
}

const Blogs = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const copyBlogs = [...blogs]

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    const user = JSON.parse(loggedUserJSON)

    return(
        <div>
          {copyBlogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <Blog
              user={user}
              key={blog.id}
              blog={blog}
              addOneLike={() => dispatch(addOneLike(blog.id, blog.likes))}
              deleteBlogInfo={() => dispatch(deleteBlogInfoFor(blog.id))}
            />
          )}
        </div>
    )
}

export default Blogs