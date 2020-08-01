import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  }

  const logout = (user) => {
    window.localStorage.removeItem(
      'loggedBloglistappUser'
    )

    setUser(null)
  }

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  if (user === null) {
    return (
      <Login 
        handleLogin={handleLogin} username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} 
      />
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <LoggedInMessage user={user.name} logout={logout} />
        <h2>create new</h2>
        <NewBlogForm 
          addBlog={addBlog} newTitle={newTitle} handleNewTitle={handleNewTitle}
          newAuthor={newAuthor} handleNewAuthor={handleNewAuthor} 
          newUrl={newUrl} handleNewUrl={handleNewUrl} 
        />
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App