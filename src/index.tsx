import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import './test.css';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/HomePage').then(({ default: Component }) => ({ Component })),
      },
      {
        path: 'about',
        lazy: () => import('./pages/AboutPage').then(({ default: Component }) => ({ Component })),
      },
    ],
  },
]);

const rootEl = document.getElementById('root');

if (!rootEl) throw new Error('not found root element');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
