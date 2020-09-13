import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createUser } from '../reducers/loginReducer'
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
                <DIV>
                    name
                    <Input name="name" />
                </DIV>
                <DIV>
                    username
                    <Input name="username" />
                </DIV>
                <DIV>
                    password
                    <Input name="password" />
                </DIV>
                <Button type="submit">create account</Button>
            </form>
        </div>
    )
}

export default NewUser