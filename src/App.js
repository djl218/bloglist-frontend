import React, { useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
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

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)
  const token = useSelector(state => state.token)

  useEffect(() => {
    dispatch(initializeToken())
    dispatch(initializeBlogs())
  }, [dispatch])

  const newBlogFormRef = React.createRef()

  const navStyle = {
    background: 'lightgrey',
    marginBottom: 10
  }

  const padding = {
    padding: 5
  }

  const noSpace = {
    margin: 0,
    padding: 0
  }

  if (!loggedUser && !token) {
    return (
      <div>
        <h1>blog app</h1>
        <SuccessfulNotification />
        <UnsuccessfuNotification />
        <h2>Log in to application</h2>
        <Login />
        <br></br>
        <br></br>
        <br></br>
        <h2 style={noSpace}>Not a user?</h2>
        <h3 style={noSpace}>Create an account here</h3>
        <NewUser />
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <div style={navStyle}>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <LoggedInMessage />
          </div>
        </div>

        <Switch>
          <Route path="/users/:id">
            <h1>blog app</h1>
            <User />
          </Route>
          <Route path="/users">
            <h1>blog app</h1>
            <h2>Users</h2>
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <h1>blog app</h1>
            <Blog />
          </Route>
          <Route path="/">
            <SuccessfulNotification />
            <h1>blog app</h1>
            <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
              <NewBlogForm />
            </Togglable>
            <Blogs />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App