import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import successfulNotificationReducer from './reducers/successfulNotificationReducer'
import unsuccessfulNotificationReducer from './reducers/unsuccessfulNotificationReducer'
import blogReducer from './reducers/blogReducer'
import tokenReducer from './reducers/tokenReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    successfulNotification: successfulNotificationReducer,
    unsuccessfulNotification: unsuccessfulNotificationReducer,
    blogs: blogReducer,
    token: tokenReducer,
    login: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store