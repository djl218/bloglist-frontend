import React from 'react'

const LoggedInMessage = ({ user, logout }) => (
    <p>
        {user} logged in
        <button onClick={logout}>logout</button>
    </p>
)

export default LoggedInMessage