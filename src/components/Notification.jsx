import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();
  console.log(`Notification message: ${notification.message}`);

  if (!notification.message) return null;

  const style = {
    color: notification.type === 'error' ? red : green,
    backgroundColor: '#f1f1f1',
    padding: '10px',
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
