import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import TempContextProvider from './context/TempContextProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <TempContextProvider>
        <App />
      </TempContextProvider>
  </React.StrictMode>
);
