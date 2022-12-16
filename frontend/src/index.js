import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routes from './Routes'
import reportWebVitals from './reportWebVitals'
import App from './App'
import SensorProvider from './source/SensorProvider'
import StatusProvider from './source/StatusProvider'
import { Provider } from 'react-redux'
import store from './store'
import AuthProvider from './source/Auth/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <SensorProvider>
          <StatusProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </StatusProvider>
        </SensorProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

reportWebVitals()
