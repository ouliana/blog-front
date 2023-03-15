const Notification = ({ message, messageType }) => {
  if (message === null) return null;

  return <div className={messageType}></div>;
};

export default Notification;
