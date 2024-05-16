import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './routes/Login.tsx'
import Home from './routes/Home.tsx'
import Signup from './routes/Signup.tsx'
import Proteccion from './routes/Proteccion.tsx'
import Profile from './routes/Profile.tsx'
import Search from './routes/Search.tsx'
import {AuthProvider} from './auth/AuthProv.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Proteccion />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
