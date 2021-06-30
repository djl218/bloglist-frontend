import React from 'react'
import SuccessfulNotification from './SuccessfulNotification'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { addOneLike, deleteBlogInfoFor, addComment } from '../reducers/blogReducer'
import { addBookmark } from '../reducers/userReducer'

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
const Input = styled.input`
  padding: 0.5em;
  color: Cyan;
  background: Indigo;
  border: none;
  border-radius: 3px;
`
const H2 = styled.h2`
  font-size: 1.5em;
  text-align: left;
  color: FireBrick;
`
const DIV = styled.div`
  font-size: 1.1em;
  text-align: left;
  color: OrangeRed;
`

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
                    <H2>
                        {blog.title} by {blog.author}
                    </H2>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                </div>
                <DIV className="numberOfLikes">
                    {blog.likes} likes
                    <Button id='likeButton' onClick={() => dispatch(addOneLike(blog.id, blog.likes))}>like</Button>
                </DIV>
                <DIV>
                    <Button id='bookmarkButton' onClick={() => dispatch(addBookmark(user, blog))}>bookmark</Button>
                </DIV>
                <DIV>
                    added by {blog.user.name}
                </DIV>
                <div>
                    {
                        user.username === blog.user.username
                        ? <Button id='deleteButton' onClick={() => deleteBlog(blog.id)}>remove</Button>
                        : null
                    }
                </div>
                <div>
                    <H2><b>comments</b></H2>
                    <form onSubmit={handleComment}>
                        <div>
                            <Input name="comment" />
                            <Button id="comment-button" type="submit">add comment</Button>
                        </div>
                        <DIV>
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
                        </DIV>
                    </form>
                </div>
            </div>
        )
    }
}

export default Blog