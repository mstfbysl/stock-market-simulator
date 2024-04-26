import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <I18nextProvider>
    <ColorModeScript />
    <App />
  </I18nextProvider>
);
