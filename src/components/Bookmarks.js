import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { deleteBookmark } from '../reducers/userReducer'

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

const BookmarkHelper = ({ user, blogId, title, author }) => {
    const dispatch = useDispatch()
    return (
        <li>
            <Link to={`blogs/${blogId}`}>{title} by {author}</Link>
            <div>
                <Button onClick={() => dispatch(deleteBookmark(user, blogId))}>unbookmark</Button>
            </div>
        </li>
    )
}

const Bookmarks = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    const user = JSON.parse(loggedUserJSON)

    if (user.bookmarks.length === 0) {
        return (
            <div>You have no bookmarks</div>
        )
    }
    return (
        <div>
            <ul>
                {user.bookmarks.map(bookmark => (
                    <BookmarkHelper
                        key={bookmark._id}
                        user={user}
                        blogId={bookmark.blogId}
                        title={bookmark.title}
                        author={bookmark.author}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Bookmarks