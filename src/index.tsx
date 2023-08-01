import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import MainLoader from './components/main-loader/MainLoader';
import history from './redux/router';
import { configureStore } from './redux/configureStore';
import './styles/index.scss';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} />
      <MainLoader />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);