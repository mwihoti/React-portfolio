import { useReducer } from 'react';
import { ThemeContext, ThemeDispatchContext } from './theme.js';

function themeReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return !state;
    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, false);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

