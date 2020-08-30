import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { addOneLike, deleteBlogInfoFor } from '../reducers/blogReducer'

const Blog = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)

    const match = useRouteMatch('/blogs/:id')
    const blog = match
        ? blogs.find(user => user.id === match.params.id)
        : null

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    const user = JSON.parse(loggedUserJSON)

    if (!blog) {
        return null
    } else {
        return (
            <div>
                <div>
                    <h2>
                        {blog.title}
                    </h2>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                </div>
                <div className="numberOfLikes">
                    {blog.likes} likes
                    <button id='likeButton' onClick={() => dispatch(addOneLike(blog.id, blog.likes))}>like</button>
                </div>
                <div>
                    added by {blog.user.name}
                </div>
                <div>
                    {
                        user.username === blog.user.username
                        ? <button id='deleteButton' onClick={() => dispatch(deleteBlogInfoFor(blog.id))}>remove</button>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default Blog