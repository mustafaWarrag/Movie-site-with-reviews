import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorBoundary from './ErrorBoundary.jsx';
import { Provider } from "react-redux";
import { Container, Typography } from '@mui/material';
import store from './redux/store.js';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<FallbackErrorBoundary/>}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
