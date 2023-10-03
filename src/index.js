import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import store from './slices/index';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const initComponent = await init();
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        {initComponent}
      </Provider>
    </React.StrictMode>,
  );
};

app();
