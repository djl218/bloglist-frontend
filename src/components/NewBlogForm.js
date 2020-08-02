import React, {useState} from 'react'

const NewBlogForm = ({ addBlogToList }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

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
        addBlogToList({
          title: newTitle,
          author: newAuthor,
          url: newUrl
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return(
        <form onSubmit={addBlog}>
        <div>
            title: <input value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
            author: <input value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>
            url: <input value={newUrl} onChange={handleNewUrl} />
        </div>
        <div>
            <button type="submit">create</button>
        </div>
        </form>
    )
}

export default NewBlogForm