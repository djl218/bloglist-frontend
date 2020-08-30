import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_USER': {
            console.log(action)
            return action.data
        }
        case 'LOGOUT': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const initializeUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password
        })
        window.localStorage.setItem(
            'loggedBloglistappUser', JSON.stringify(user)
        )
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
        const localStoreUser = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch({
            type: 'INIT_USER',
            data: localStoreUser
        })
    }
}

export const initializeLogout = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export default loginReducer