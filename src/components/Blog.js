import React from 'react'
import SuccessfulNotification from './SuccessfulNotification'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { addOneLike, deleteBlogInfoFor, addComment } from '../reducers/blogReducer'

const BlogHelper = ({ comment, user }) => {
    return (
        <li>{comment} - {user}</li>
    )
}

const Blog = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const blogs = useSelector(state => state.blogs)
    const copyBlogs = [...blogs]

    const match = useRouteMatch('/blogs/:id')
    const blog = match
        ? copyBlogs.find(user => user.id === match.params.id)
        : null

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    const user = JSON.parse(loggedUserJSON)

    const deleteBlog = (id) => {
        dispatch(deleteBlogInfoFor(id))
        history.push('/')
    }

    const handleComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value

        dispatch(addComment(
            blog.id,
            user.name,
            blog.userComments,
            comment
        ))

        event.target.comment.value = ''
    }

    if (!blog) {
        return null
    } else {
        return (
            <div>
                <div>
                <SuccessfulNotification />
                    <h2>
                        {blog.title} by {blog.author}
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
                        ? <button id='deleteButton' onClick={() => deleteBlog(blog.id)}>remove</button>
                        : null
                    }
                </div>
                <div>
                    <h2><b>comments</b></h2>
                    <form onSubmit={handleComment}>
                        <div>
                            <input name="comment" />
                            <button id="comment-button" type="submit">add comment</button>
                        </div>
                        <div>
                            <ul>
                                {
                                    blog.userComments === undefined
                                    ? null
                                    : blog.userComments
                                        .map(userComment =>
                                            <BlogHelper
                                                key={userComment.commentId}
                                                comment={userComment.comment}
                                                user={userComment.user}
                                            />
                                        )
                                }
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Blog