var timerHelper

const successfulNotificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SHOW_NOTIFICATION': {
            return action.data.message
        }
        case 'HIDE_NOTIFICATION': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const setSuccessfulNotification = (message) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: { message }
        })

        clearTimeout(timerHelper)

        timerHelper = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                data: null
            })
        }, 5000)
    }
}

export default successfulNotificationReducer