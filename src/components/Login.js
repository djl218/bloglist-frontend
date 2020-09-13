import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { initializeUser } from '../reducers/loginReducer'
import { setUnsuccessfulNotification } from '../reducers/unsuccessfulNotificationReducer'

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
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: Cyan;
  background: Indigo;
  border: none;
  border-radius: 3px;
`
const DIV = styled.div`
  font-size: 1.1em;
  text-align: left;
  color: OrangeRed;
`

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
                <DIV>
                    username
                    <Input name="username" />
                </DIV>
                <DIV>
                    password
                    <Input type="password" name="password" />
                </DIV>
                <Button id="login-button" type="submit">login</Button>
            </form>
        </div>
    )
}

export default Login