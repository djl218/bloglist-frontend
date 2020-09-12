import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setSuccessfulNotification } from './successfulNotificationReducer'

const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_USER': {
            return action.data
        }
        case 'LOGOUT': {
            return action.data
        }
        case 'ADD_USER': {
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
        const users = await userService.getAll()

        window.localStorage.setItem(
            'loggedBloglistappUser', JSON.stringify(user)
        )
        window.localStorage.setItem(
            'loggedUsersForBlogListApp', JSON.stringify(users)
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

export const createUser = (newUserObject) => {
    return async dispatch => {
        await userService.create(newUserObject)
        dispatch({
            type: 'ADD_USER',
            data: null
        })
        dispatch(setSuccessfulNotification('account created, please login'))
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