import blogService from '../services/blogs'

const tokenReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_TOKEN': {
            return action.data
        }
        case 'OUT_TOKEN': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const initializeToken = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            const token = await blogService.setToken(user.token)
            dispatch({
                type: 'INIT_TOKEN',
                data: token
            })
        }
    }
}

export const tokenRemoval = () => {
    return async dispatch => {
        dispatch({
            type: 'OUT_TOKEN',
            data: null
        })
    }
}

export default tokenReducer