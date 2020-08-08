import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('shows title and author by default', () => {
    const blog = {
        title: 'Coding Horror',
        author: 'Jeff Atwood',
        user: {
            username: 'redDog14',
            name: 'Sophie'
        }
    } 

    const user = {
        name: 'Sophie'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const div = component.container.querySelector('.defaultBlogDisplay')
    expect(div).toHaveTextContent(
        'Coding Horror', 
        'Jeff Atwood'
    )
})

test('shows url and likes after view button is clicked', () => {
    const blog = {
        title: 'Coding Horror',
        author: 'Jeff Atwood',
        url: 'https://blog.codinghorror.com/',
        likes: 29,
        user: {
            username: 'redDog14',
            name: 'Sophie'
        }
    }

    const user = {
        name: 'Sophie'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} blogInfoVisible={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogDisplayAfterClick')
    expect(div).toHaveTextContent(
        'https://blog.codinghorror.com/',
        '29'
    )
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const blog = {
        title: 'Coding Horror',
        author: 'Jeff Atwood',
        url: 'https://blog.codinghorror.com/',
        likes: 29,
        user: {
            username: 'redDog14',
            name: 'Sophie'
        }
    }

    const user = {
        name: 'Sophie'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} addOneLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
