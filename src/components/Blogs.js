import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addOneLike, deleteBlogInfoFor } from '../reducers/blogReducer'

import styled from 'styled-components'

const Button = styled.button`
  color: Magenta;
  background: Gold;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid PaleVioletRed;
  border-radius: 3px;
`
const DIV = styled.div`
  font-size: 1.1em;
  text-align: left;
  color: OrangeRed;
`

const Blog = ({ user, blog, addOneLike, deleteBlogInfo }) => {
    const [blogInfoVisible, setBlogInfoVisible] = useState(false)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderColor: 'magenta',
      borderWidth: 3,
      marginBottom: 5,
      marginRight: 300
    }

    const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
    const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} className="defaultBlogDisplay">
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          <Button id='viewButton' onClick={() => setBlogInfoVisible(true)}>view</Button>
        </div>
        <div style={showWhenVisible} className="blogDisplayAfterClick">
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            <Button onClick={() => setBlogInfoVisible(false)}>hide</Button>
          </div>
          <div>
          <a href={blog.url}>{blog.url}</a>
          </div>
          <DIV className="numberOfLikes">
            {blog.likes} likes
            <Button id='likeButton' onClick={addOneLike}>like</Button>
          </DIV>
          <DIV>
            added by {blog.user.name}
          </DIV>
          <div>
            {
              user.username === blog.user.username
              ? <Button id='deleteButton' onClick={deleteBlogInfo}>remove</Button>
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