import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import AppContainer from './components/App/AppContainer'

const loggerMiddleware = createLogger()


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

ReactDOM.render(
  <Provider store={store}>
    <div className="mainOuterBox">
      <AppContainer />
    </div>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
