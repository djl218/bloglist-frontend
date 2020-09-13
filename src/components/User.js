import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import styled from 'styled-components'

const H2 = styled.h2`
    font-size: 1.5em;
    text-align: left;
    color: FireBrick;
`
const UL = styled.ul`
    font-size: 1.2em;
    text-align: left;
    color: OrangeRed;
`

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
            <H2>no blogs added by user</H2>
        )
    } else {
        return (
            <div>
                <H2>{user.name}</H2>
                <H2>added blogs</H2>
                <UL>
                    {user.blogs
                        .map(blog =>
                            <UserHelper
                                key={blog.id}
                                blog={blog.title}
                            />
                        )
                    }
                </UL>
            </div>
        )
    }
}

export default User