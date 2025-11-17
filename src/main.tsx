// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import { CRMProvider } from './contexts/CRMContext';
// import { Toaster } from './components/ui/sonner';
// import './styles/globals.css';
// import './index.css'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <CRMProvider>
//       <App />
//       <Toaster position="top-right" />
//     </CRMProvider>
//   </StrictMode>,
// );

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';
import { CRMProvider } from './contexts/CRMContext';
import { Toaster } from './components/ui/sonner';

import './styles/globals.css';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <CRMProvider>
        <App />
        <Toaster position="top-right" />
      </CRMProvider>
    </HashRouter>
  </StrictMode>
);