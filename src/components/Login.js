import React from 'react'
import { useDispatch } from 'react-redux'

import { initializeUser } from '../reducers/loginReducer'
import { setUnsuccessfulNotification } from '../reducers/unsuccessfulNotificationReducer'

const Login = () => {
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const username = event.target.username.value
          const password = event.target.password.value
          dispatch(initializeUser(username, password))
          event.target.username.value = ''
          event.target.password.value = ''
        } catch (exception) {
          event.target.username.value = ''
          event.target.password.value = ''
          dispatch(setUnsuccessfulNotification('wrong username or password'))
        }
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