import { createContext, useReducer, useContext } from 'react';

function notificationReducer(state, action) {
  switch (action.type) {
    case 'USERSIGNEDIN':
      return {
        body: `${action.payload.name} signed in`,
        type: 'success',
      };
    case 'AUTHERROR':
      return {
        body: 'Wrong login or password',
        type: 'error',
      };
    case 'NEWBLOG':
      return {
        body: `A new blog ${action.payload.title} by ${action.payload.author} is added`,
        type: 'success',
      };
    case 'CLEAR':
      return null;
    default:
      return state;
  }
}

const NotificationContext = createContext();

export function useNotificationValue() {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
}

export function useNotificationDispatch() {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
}

export function NotificationContextProvider(props) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
