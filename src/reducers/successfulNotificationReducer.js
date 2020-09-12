var timerHelper

const successfulNotificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SHOW_SUCCESS_NOTIFICATION': {
            return action.data.successMessage
        }
        case 'HIDE_SUCCESS_NOTIFICATION': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const setSuccessfulNotification = (successMessage) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_SUCCESS_NOTIFICATION',
            data: { successMessage }
        })

        clearTimeout(timerHelper)

        timerHelper = setTimeout(() => {
            dispatch({
                type: 'HIDE_SUCCESS_NOTIFICATION',
                data: null
            })
        }, 5000)
    }
}

export default successfulNotificationReducer