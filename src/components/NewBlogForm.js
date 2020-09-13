import React from 'react'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'

import styled from 'styled-components'

const Button = styled.button`
  color: Magenta;
  background: Gold;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid PaleVioletRed;
  border-radius: 3px;
`
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: Cyan;
  background: Indigo;
  border: none;
  border-radius: 3px;
`
const DIV = styled.div`
  font-size: 1.1em;
  text-align: left;
  color: OrangeRed;
`

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
        <DIV>
            title: <Input name="newTitle" />
        </DIV>
        <DIV>
            author: <Input name="newAuthor" />
        </DIV>
        <DIV>
            url: <Input name="newUrl" />
        </DIV>
        <div>
            <Button id='createButton' type="submit">create</Button>
        </div>
        </form>
    )
}

export default NewBlogForm