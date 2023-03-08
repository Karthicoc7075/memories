import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore,applyMiddleware,compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {reducers} from './reducers/index'
import {composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </React.StrictMode>
);
