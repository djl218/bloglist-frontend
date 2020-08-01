import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import LoggedInMessage from './components/LoggedInMessage'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App