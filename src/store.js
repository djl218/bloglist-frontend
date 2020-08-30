import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import successfulNotificationReducer from './reducers/successfulNotificationReducer'
import unsuccessfulNotificationReducer from './reducers/unsuccessfulNotificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    successfulNotification: successfulNotificationReducer,
    unsuccessfulNotification: unsuccessfulNotificationReducer,
    blogs: blogReducer,
    users: userReducer,
    token: tokenReducer,
    login: loginReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store