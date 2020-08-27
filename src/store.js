import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import successfulNotificationReducer from './reducers/successfulNotificationReducer'
import unsuccessfulNotificationReducer from './reducers/unsuccessfulNotificationReducer'

const reducer = combineReducers({
    successfulNotification: successfulNotificationReducer,
    unsuccessfulNotification: unsuccessfulNotificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store