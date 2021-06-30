import React from 'react'
import { useDispatch } from 'react-redux'

import { initializeLogout } from '../reducers/userReducer'
import { tokenRemoval } from '../reducers/tokenReducer'

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

const LoggedInMessage = () => {
    const dispatch = useDispatch()

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    const user = JSON.parse(loggedUserJSON)

    const logout = () => {
        window.localStorage.clear()
        dispatch(initializeLogout())
        dispatch(tokenRemoval())
    }

    if (user !== null) {
        return (
            <>
                {user.name} logged in
                <Button id='logoutButton' onClick={logout}>logout</Button>
            </>
        )
    } else {
        return null
    }
}

export default LoggedInMessage