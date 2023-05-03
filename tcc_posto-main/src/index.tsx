import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './style/Global';
import MapPage from './pages/MapPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

 const router = createBrowserRouter([
     {
         path: '/',
         errorElement: <ErrorPage/>,
         element: <HomePage/>
     },
     {
        path: '/mapa',
        errorElement: <ErrorPage/>,
        element: <MapPage/>
     },
 ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyle/>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
