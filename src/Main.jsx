import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/**
 * Ponto de entrada principal da aplicação.
 * Renderiza o componente App dentro do elemento raiz do DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
