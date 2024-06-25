import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashborad from './pages/Dashboard';


function App() {

  const appRouter = createBrowserRouter([
    {
      element: <AppLayout/>,
      children:[
        {
          path: "/",
          element: <Landing/>
        },
        {
          path: "/auth",
          element: <Auth/>
        },
        {
          path: "/dashboard",
          element: <Dashborad/>
        }
      ] 
    }
]);

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
