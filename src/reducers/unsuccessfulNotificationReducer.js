var timerHelper

const unsuccessfulNotificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SHOW_NO_SUCCESS_NOTIFICATION': {
            return action.data.noSuccessMessage
        }
        case 'HIDE_NO_SUCCESS_NOTIFICATION': {
            return action.data
        }
        default: {
            return state
        }
    }
}

export const setUnsuccessfulNotification = (noSuccessMessage) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NO_SUCCESS_NOTIFICATION',
            data: { noSuccessMessage }
        })

        clearTimeout(timerHelper)

        timerHelper = setTimeout(() => {
            dispatch({
                type: 'HIDE_NO_SUCCESS_NOTIFICATION',
                data: null
            })
        }, 5000)
    }
}

export default unsuccessfulNotificationReducer