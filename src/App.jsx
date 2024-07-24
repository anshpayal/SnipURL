import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashborad from './pages/Dashboard';
import UrlProvider from './Context';
import PrivateRoute from './components/PrivateRoute';
import Link from './pages/Link';
import RedirectLink from './pages/RedirectLink';


function App() {

  const appRouter = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />
        },
        {
          path: "/auth",
          element: <Auth />
        },
        {
          path: "/dashboard",
          element: <PrivateRoute>
            <Dashborad />
          </PrivateRoute>
        },
        {
          path:"/link/:id",
          element: (
            <PrivateRoute>
              <Link/>
            </PrivateRoute>
          )
        },
        {
          path:"/:id",
          element:<RedirectLink/>
        }
      ]
    }
  ]);

  return (
    <UrlProvider>
      <RouterProvider router={appRouter} />
    </UrlProvider>
  )
}

export default App
