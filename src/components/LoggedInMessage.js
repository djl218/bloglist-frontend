import React from 'react'
import { useDispatch } from 'react-redux'

import { initializeLogout } from '../reducers/loginReducer'
import { tokenRemoval } from '../reducers/tokenReducer'

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
                <button id='logoutButton' onClick={logout}>logout</button>
            </>
        )
    } else {
        return null
    }
}

export default LoggedInMessage