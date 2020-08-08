import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('form calls the event handler it received as props with the right details when a new blog is called', () => {
    const addBlogToList = jest.fn()

    const component = render(
        <NewBlogForm addBlogToList={addBlogToList} />
    )
    
    const newTitle = component.container.querySelector('#newTitle')
    const newAuthor = component.container.querySelector('#newAuthor')
    const newUrl = component.container.querySelector('#newUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(newTitle, {
        target: { value: 'Dave Ceddia Blog' }
    })
    fireEvent.change(newAuthor, {
        target: { value: 'Dave Ceddia' }
    })
    fireEvent.change(newUrl, {
        target: { value: 'https://daveceddia.com/' }
    })
    fireEvent.submit(form)

    expect(addBlogToList.mock.calls).toHaveLength(1)
    expect(addBlogToList.mock.calls[0][0].title).toBe('Dave Ceddia Blog')
    expect(addBlogToList.mock.calls[0][0].author).toBe('Dave Ceddia')
    expect(addBlogToList.mock.calls[0][0].url).toBe('https://daveceddia.com/')
})