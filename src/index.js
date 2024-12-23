import './index.css';
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, useTheme } from './context/theme';
import Footer from './components/footer';


const RootComponent = () => {

  const darkTheme = useTheme();

  return (
    <React.StrictMode>
      <ThemeProvider value={darkTheme}>
        
          <div className={darkTheme ? 'theme__dark' : undefined }>
            <App />

            <Footer />
          </div>
        
      </ThemeProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
