import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type };
    case 'CLEAR_NOTIFICATION':
      return { message: null, type: '' };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: '',
  });
  const notify = ({ message, type }) => {
    console.log('Notification', {message, type});
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type },
    });
    // console.log(`notify msg: ${message} and type: ${type}`);
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };
  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => useContext(NotificationContext);
