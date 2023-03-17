const Notification = props => {
  console.log('Notification is running...');
  if (props.message === null) return null;

  const { body, type } = props.message;

  console.log('in Notification: ', { body, type });

  return <div className={type}>{body}</div>;
};

export default Notification;
