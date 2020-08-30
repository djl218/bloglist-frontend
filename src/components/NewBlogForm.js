import React from 'react'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const addBlogToList = (event) => {
        event.preventDefault()
        const newTitle = event.target.newTitle.value
        const newAuthor = event.target.newAuthor.value
        const newUrl = event.target.newUrl.value

        dispatch(addBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl
        }))

        event.target.newTitle.value = ''
        event.target.newAuthor.value = ''
        event.target.newUrl.value = ''
    }
    return(
        <form onSubmit={addBlogToList}>
        <div>
            title: <input name="newTitle" />
        </div>
        <div>
            author: <input name="newAuthor" />
        </div>
        <div>
            url: <input name="newUrl" />
        </div>
        <div>
            <button id='createButton' type="submit">create</button>
        </div>
        </form>
    )
}

export default NewBlogForm