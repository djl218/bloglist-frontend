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
    blogService
    .getAll()
    .then(initialBlogs => {
      setBlogs(initialBlogs)
    })  
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

  const addOneLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1}

    blogService
      .update(id, changedBlog)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
  }

  const deleteBlogInfoFor = (id) => {
    const blog = blogs.find(n => n.id === id)
    const confirmWindowForDelete = window.confirm(`Remove ${blog.title} by ${blog.author}?`)

    if (confirmWindowForDelete === true) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
    } else {
      return blogs
    }
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
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => 
          <Blog 
            user={user}
            key={blog.id} 
            blog={blog} 
            addOneLike={() => addOneLike(blog.id)}
            deleteBlogInfo={() => deleteBlogInfoFor(blog.id)}
          />
        )}
      </div>
    )
  }
}

export default App