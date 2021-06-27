import React from 'react'
import Main from './Main'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/reducer'
import './App.css'

const initialState = {
  fromCurrency: [],
  fromAmount: 0,
  toCurrency: [],
  toAmount: 0,
  exchangeRate: '',
}

let store = createStore(rootReducer, initialState);

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App;
