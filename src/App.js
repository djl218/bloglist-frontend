import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import SuccessfulNotification from './components/SuccessfulNotification'
import UnsuccessfuNotification from './components/UnsuccessfulNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [noSuccessMessage, setNoSuccessMessage] = useState(null)

  const newBlogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNoSuccessMessage('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNoSuccessMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(
      'loggedBloglistappUser'
    )

    setUser(null)
  }

  const addBlog = (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <UnsuccessfuNotification message={noSuccessMessage} />
        <Login 
          handleLogin={handleLogin} username={username} setUsername={setUsername}
          password={password} setPassword={setPassword} 
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <SuccessfulNotification message={successMessage} />
        <LoggedInMessage user={user.name} logout={logout} />
        <h2>create new</h2>
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
          <NewBlogForm addBlogToList={addBlog} />
        </Togglable>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App