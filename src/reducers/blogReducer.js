import blogService from '../services/blogs'

import { setSuccessfulNotification } from './successfulNotificationReducer'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS': {
            return action.data
        }
        case 'LIKE': {
            const id = action.data.id
            const findBlog = state.find(n => n.id === id)
            const likedBlog = {
                ...findBlog, likes: action.data.likes
            }
            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        }
        case 'ADD_COMMENT': {
            const id = action.data.blogId
            const findBlog = state.find(n => n.id === id)
            const blogWithComment = {
                ...findBlog, userComments: action.data.userComments
            }
            return state.map(blog =>
                blog.id !== id ? blog : blogWithComment
            )
        }
        case 'ADD_BLOG': {
            const returnedBlog = action.data
            const copyBlogs = [...state]
            return copyBlogs.concat(returnedBlog)
        }
        case 'DELETE': {
            const id = action.data
            const copyBlogs = [...state]
            const blogToDelete = state.find(n => n.id === id)
            const confirmWindowForDelete = window.confirm(
                `Remove ${blogToDelete.title} by ${blogToDelete.author}?`
            )
            if (confirmWindowForDelete === true) {
                blogService.deleteBlog(id)
                return copyBlogs.filter(blog => blog.id !== id)
            } else {
                return state
            }
        }
        default: {
            return state
        }
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addOneLike = (id, likes) => {
    return async dispatch => {
        const likedBlog = await blogService.update(id, likes)
        dispatch({
            type: 'LIKE',
            data: likedBlog
        })
    }
}

export const addComment = (blogId, user, comments, comment) => {
    return async dispatch => {
        const blogWithComment = await blogService.createComment(blogId, user, comments, comment)
        dispatch({
            type: 'ADD_COMMENT',
            data: blogWithComment
        })
        dispatch(setSuccessfulNotification('new comment added'))
    }
}

export const addBlog = (blogObject) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blogObject)
        dispatch({
            type: 'ADD_BLOG',
            data: addedBlog
        })
        dispatch(setSuccessfulNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`))
    }
}

export const deleteBlogInfoFor = (id) => {
    return {
        type: 'DELETE',
        data: id
    }
}

export default blogReducer