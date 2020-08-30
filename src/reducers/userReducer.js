import userService from '../services/users'

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USERS': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()

        window.localStorage.setItem(
            'loggedUsersForBlogListApp', JSON.stringify(users)
        )
        const loggedUsersForBlogListApp = window.localStorage.getItem('loggedUsersForBlogListApp')
        const localStoreUsersForBlogListApp = JSON.parse(loggedUsersForBlogListApp)
        dispatch({
            type: 'INIT_USERS',
            data: localStoreUsersForBlogListApp
        })
    }
}

export default userReducer