import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const TD1 = styled.td`
    font-size: 1.2em;
    text-align: left;
    color: Magenta;
`
const TD2 = styled.td`
    font-size: 1.2em;
    text-align: left;
    color: OrangeRed;
`

const UsersHelper = ({ user, name, blogsCreated }) => {
    return (
        <tr>
            <td key={user.id} style={{ textAlign:'left' }}>
                <Link to={`/users/${user.id}`}>{name}</Link>
            </td>
            <TD2 style={{ textAlign:'right' }}>{blogsCreated}</TD2>
        </tr>
    )
}

const Users = () => {
    const loggedUsersForBlogListApp = window.localStorage.getItem('loggedUsersForBlogListApp')
    const users = JSON.parse(loggedUsersForBlogListApp)

    return (
        <table>
            <thead>
                <tr>
                    <td style={{ textAlign:'right' }}>&nbsp;</td>
                    <TD1 style={{ textAlign:'right' }}><b>blogs created</b></TD1>
                </tr>
            </thead>
            <tbody>
                {users
                    .map(user =>
                    <UsersHelper
                        key={user.id}
                        user={user}
                        name={user.name}
                        blogsCreated={user.blogs.length}
                    />
                )}
            </tbody>
        </table>
    )
}

export default Users