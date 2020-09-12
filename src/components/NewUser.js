import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createUser } from '../reducers/loginReducer'
import { setUnsuccessfulNotification } from '../reducers/unsuccessfulNotificationReducer'

const NewUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleNewUser = async (event) => {
        event.preventDefault()
        const newName = event.target.name.value
        const newUsername = event.target.username.value
        const newPassword = event.target.password.value

        dispatch(createUser({
            name: newName,
            username: newUsername,
            password: newPassword
        }))
        .catch(() => dispatch(setUnsuccessfulNotification('username and password each need to be at least three characters')))

        event.target.name.value = ''
        event.target.username.value = ''
        event.target.password.value = ''
        history.push('/')
    }

    return (
        <div>
            <form onSubmit={handleNewUser}>
                <div>
                    name
                    <input name="name" />
                </div>
                <div>
                    username
                    <input name="username" />
                </div>
                <div>
                    password
                    <input name="password" />
                </div>
                <button type="submit">create account</button>
            </form>
        </div>
    )
}

export default NewUser