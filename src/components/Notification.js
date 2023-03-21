const Notification = props => {
  if (props.message === null) return null;

  const { body, type } = props.message;

  return <div className={type}>{body}</div>;
};

export default Notification;
