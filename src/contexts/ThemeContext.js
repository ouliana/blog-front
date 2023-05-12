import { createContext, useReducer, useContext } from 'react';

function themeReducer(state, action) {
  switch (action.type) {
    case 'LIGHT':
      return 'light';
    case 'DARK':
      return 'dark';
    default:
      return state;
  }
}

const ThemeContext = createContext('light');

export function useThemeValue() {
  const valueAndDispatch = useContext(ThemeContext);
  return valueAndDispatch[0];
}

export function useThemeDispatch() {
  const valueAndDispatch = useContext(ThemeContext);
  return valueAndDispatch[1];
}

export function ThemeContextProvider(props) {
  const [theme, themeDispatch] = useReducer(themeReducer, 'light');

  return (
    <ThemeContext.Provider value={[theme, themeDispatch]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
