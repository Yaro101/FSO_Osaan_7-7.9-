import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state)=>state.notification)

  if (!notification.message) return null
  
  const successStyle = {
    color: 'hsl(98, 97%, 36%)',
    background: 'rgba(211, 211, 211, 0.418)',
  };
  const errorStyle = {
    color: 'hsla(357, 90%, 43%, 0.801)',
    background: 'rgba(211, 211, 211, 0.336)',
  };

  const style = notification.type === 'error' ? errorStyle : successStyle;

  return (
    <div className={`${notification.type} notification`} style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
