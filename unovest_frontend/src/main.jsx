import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './redux/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={Store}>
    <GoogleOAuthProvider clientId="237002998358-8hdfg645op7i40s2bchikvsorj6dat40.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>,
)
