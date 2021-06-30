import React, { useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Bookmarks from './components/Bookmarks'
import User from './components/User'
import Users from './components/Users'
import NewUser from './components/NewUser'
import SuccessfulNotification from './components/SuccessfulNotification'
import UnsuccessfuNotification from './components/UnsuccessfulNotification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeToken } from './reducers/tokenReducer'
import { initializeBlogs } from './reducers/blogReducer'

import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import styled from 'styled-components'

const H1 = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: Navy;
`
const H2 = styled.h2`
  font-size: 1.5em;
  text-align: left;
  color: FireBrick;
`
const H3 = styled.h3`
  font-size: 1.1em;
  text-align: left;
  color: FireBrick;
`
const Page = styled.div`
  padding: 4em;
  width: 100vw;
  height: 100vh;
  background: Thistle;
`
const Nav = styled.div`
  padding: 1em;
  background: SpringGreen;
  position: absolute;
  top: 8px;
  left: 8px;
  right: -150px;
`

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)
  const token = useSelector(state => state.token)

  useEffect(() => {
    dispatch(initializeToken())
    dispatch(initializeBlogs())
  }, [dispatch])

  const newBlogFormRef = React.createRef()

  const padding = {
    padding: 5
  }

  const noSpace = {
    margin: 0,
    padding: 0
  }

  if (!loggedUser && !token) {
    return (
      <Page>
        <H1>blog app</H1>
        <SuccessfulNotification />
        <UnsuccessfuNotification />
        <H2>Log in to application</H2>
        <Login />
        <br></br>
        <br></br>
        <br></br>
        <H2 style={noSpace}>Not a user?</H2>
        <H3 style={noSpace}>Create an account here</H3>
        <NewUser />
      </Page>
    )
  } else {
    return (
      <Page>
        <Nav>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/bookmarks">bookmarks</Link>
          <LoggedInMessage />
        </Nav>

        <Switch>
          <Route path="/users/:id">
            <H1>blog app</H1>
            <User />
          </Route>
          <Route path="/users">
            <H1>blog app</H1>
            <H2>Users</H2>
            <Users />
          </Route>
          <Route path="/bookmarks">
            <H1>blog app</H1>
            <H2>Bookmarks</H2>
            <Bookmarks />
          </Route>
          <Route path="/blogs/:id">
            <H1>blog app</H1>
            <Blog />
          </Route>
          <Route path="/">
            <H1>blog app</H1>
            <SuccessfulNotification />
            <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
              <NewBlogForm />
            </Togglable>
            <Blogs />
          </Route>
        </Switch>
      </Page>
    )
  }
}

export default App