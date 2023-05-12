import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './redux/Store';
import './data';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import Spinner from './views/spinner/Spinner';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
