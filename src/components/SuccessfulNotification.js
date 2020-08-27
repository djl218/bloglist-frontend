import React from 'react'
import { useSelector } from 'react-redux'

const SuccessfulNotification = () => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successfulNotification = useSelector(({ successfulNotification }) => {
        if (successfulNotification === null) {
            return null
        }
        return (
            <div style={notificationStyle}>
                {successfulNotification}
            </div>
        )
    })

    return successfulNotification
}

export default SuccessfulNotification