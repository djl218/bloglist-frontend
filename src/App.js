import React, { useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Blogs from './components/Blogs'
import SuccessfulNotification from './components/SuccessfulNotification'
import UnsuccessfuNotification from './components/UnsuccessfulNotification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeToken } from './reducers/tokenReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const token = useSelector(state => state.token)

  const newBlogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeToken())
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!user && !token) {
    return (
      <div>
        <h2>Log in to application</h2>
        <UnsuccessfuNotification />
        <Login />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <SuccessfulNotification />
        <LoggedInMessage />
        <h2>create new</h2>
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
          <NewBlogForm />
        </Togglable>
        <Blogs />
      </div>
    )
  }
}

export default App