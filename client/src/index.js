import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'state'; // can import without the ./ specifying directory because of the jsonfig.json file where you specify source for imports
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
