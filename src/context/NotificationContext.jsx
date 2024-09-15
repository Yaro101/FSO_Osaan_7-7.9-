import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { message: action.payload.message, type: action.payload.type }
        case 'CLEAR_NOTIFICATION':
            return { message: null, type: '' }
        default:
            return state
    }
}

export const NotificationProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, type: '', })
    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}
export const useNotification = () => useContext(NotificationContext)
