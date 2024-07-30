import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';
import store from './Redux/Store'; // Adjust the path to your Redux store
import { Provider } from 'react-redux';

// Ensure to use ReactDOM.createRoot from the correct import
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
