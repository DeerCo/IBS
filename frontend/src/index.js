import ReactDOM from "react-dom/client";
import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import Spinner from './views/spinner/Spinner';
import App from './App';
import './data';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={configureStore()}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </Provider>);

