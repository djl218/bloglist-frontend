import React from 'react'

const NewBlogForm = ({ addBlog, newTitle, handleNewTitle, newAuthor, 
    handleNewAuthor, newUrl, handleNewUrl }) => {
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