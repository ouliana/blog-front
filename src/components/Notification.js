import { useNotificationValue } from '../contexts/NotificationContext';

export default function Notification() {
  const notification = useNotificationValue();
  if (notification === null) return null;

  var { body, type } = notification;

  return <div className={type}>{body}</div>;
}
