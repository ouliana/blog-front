import { useSelector } from 'react-redux';

export default function Notification() {
  const notification = useSelector(state => state.notification);

  if (!notification.body) return null;

  const { body, type } = notification;

  return <div className={type}>{body}</div>;
}
