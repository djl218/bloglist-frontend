import React from 'react'
import { Link } from 'react-router-dom'

const UsersHelper = ({ user, name, blogsCreated }) => {
    return (
        <tr>
            <td key={user.id} style={{ textAlign:'left' }}>
                <Link to={`/users/${user.id}`}>{name}</Link>
            </td>
            <td style={{ textAlign:'left' }}>{blogsCreated}</td>
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
                    <td style={{ textAlign:'right' }}><b>blogs created</b></td>
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