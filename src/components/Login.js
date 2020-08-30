import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { initializeUser } from '../reducers/loginReducer'
import { setUnsuccessfulNotification } from '../reducers/unsuccessfulNotificationReducer'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        dispatch(initializeUser(username, password))
        .catch(() => dispatch(setUnsuccessfulNotification('wrong username or password')))

        event.target.username.value = ''
        event.target.password.value = ''
        history.push('/')
    }

    return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input name="username" />
            </div>
            <div>
                password
                <input type="password" name="password" />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    </div>
    )
}

export default Login