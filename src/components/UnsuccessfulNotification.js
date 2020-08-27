import React from 'react'
import { useSelector } from 'react-redux'

const UnsuccessfulNotification = () => {
    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const unsuccessfulNotification = useSelector(({ unsuccessfulNotification }) => {
        if (unsuccessfulNotification === null) {
            return null
        }
        return (
            <div className="error" style={notificationStyle}>
                {unsuccessfulNotification}
            </div>
        )
    })

    return unsuccessfulNotification
}

export default UnsuccessfulNotification