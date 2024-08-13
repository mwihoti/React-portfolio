import './index.css';
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContext, ThemeDispatchContext, themeReducer } from './context/theme';

const RootComponent = () => {
  const [themeRed, dispatch] = useReducer(themeReducer, false);

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeRed}>
        <ThemeDispatchContext.Provider value={dispatch}>
          <div className={themeRed ? 'theme__dark' : undefined }>
            <App />
          </div>
        </ThemeDispatchContext.Provider>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
