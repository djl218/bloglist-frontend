import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUser = async (user) => {
    const response = await axios.get(`${baseUrl}/${user.id}`)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const updateBookmarks = async (user, blog) => {
    const newObject = {
        id: user.id,
        bookmarks: user.bookmarks.concat({
            blogId: blog.id,
            title: blog.title,
            author: blog.author
        })
    }
    const response = await axios.put(`${baseUrl}/${user.id}`, newObject)
    return response.data
}

const removeBookmark = async (user, blogId) => {
    const newObject = {
        id: user.id,
        bookmarks: user.bookmarks.filter(bookmark =>
            bookmark.blogId !== blogId
        )
    }
    const response = await axios.put(`${baseUrl}/${user.id}`, newObject)
    return response.data
}

export default { getAll, getUser, create, updateBookmarks, removeBookmark }