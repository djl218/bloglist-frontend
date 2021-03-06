import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  return token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (blogId, user, userComments, comment) => {
  const commentId = Math.floor((Math.random() * 100000) + 1).toString()
  const newObject = {
    blogId,
    userComments: userComments.concat({ user, comment, commentId })
  }
  const response = await axios.put(`${baseUrl}/${blogId}/comments`, newObject)
  return response.data
}

const update = async (id, likes) => {
  const newObject = {
    id,
    likes: likes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, createComment, update, deleteBlog }