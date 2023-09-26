import { createBrowserRouter } from 'react-router-dom'

import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Networks } from "./pages/networks";
import { ErrorPage } from "./pages/error";

import { Private } from "./routes/Private";
import { Profile } from './pages/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/admin',
    element: <Private> <Admin /> </Private>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/social',
    element: <Private> <Networks /> </Private>
  },
  {
    path: '/admin/social',
    element: <Private> <Networks /> </Private>
  },
  {
    path: '/admin/profile',
    element: <Private> <Profile /> </Private>
  },
  {
    path: '*',
    element: <ErrorPage />
  },
])

export { router };