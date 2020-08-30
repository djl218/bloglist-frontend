import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const UserHelper = ({ blog }) => {
    return (
        <li>{blog}</li>
    )
}

const User = () => {
    const loggedUsersForBlogListApp = window.localStorage.getItem('loggedUsersForBlogListApp')
    const users = JSON.parse(loggedUsersForBlogListApp)

    const match = useRouteMatch('/users/:id')
    const user = match
        ? users.find(user => user.id === match.params.id)
        : null

    if (user.blogs.length === 0) {
        return (
            <h2>no blogs added by user</h2>
        )
    } else {
        return (
            <div>
                <h2>{user.name}</h2>
                <h2>added blogs</h2>
                <ul>
                    {user.blogs
                        .map(blog =>
                            <UserHelper
                                key={blog.id}
                                blog={blog.title}
                            />
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default User