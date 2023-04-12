import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/global';
import './index.css';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// configurando router
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <Home/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
