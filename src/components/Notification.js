export default function Notification(props) {
  if (props.message === null) return null;

  var { body, type } = props.message;

  return <div className={type}>{body}</div>;
}
