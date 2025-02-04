import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './App';
import './index.css'; // Ensure your global styles are imported
import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <Provider store={store}>
  <App />
  // </Provider>
);
