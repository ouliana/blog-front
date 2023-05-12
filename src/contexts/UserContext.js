import { createContext, useReducer, useContext } from 'react';

function userReducer(state, action) {
  switch (action.type) {
    case 'SIGNEDIN':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
}

const UserContext = createContext();

export function useUserValue() {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[0];
}

export function useUserDispatch() {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[1];
}

export function UserContextProvider(props) {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
