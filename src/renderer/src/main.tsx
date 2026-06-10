import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource/dancing-script/600.css'
import '@fontsource/dancing-script/700.css'
import './styles/global.css'
import App from './App'
import { AppProvider } from './store/AppContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <App />
  </AppProvider>
)
