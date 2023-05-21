import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import PasswordRecovery from './pages/PasswordRecovery';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Songs from './pages/Songs';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Profiles from './pages/Profiles';
import SongManager from './pages/SongManager';
import Groups from './pages/Groups';
import Settings from './pages/Settings';

import ProtectedRoute from './route/ProtectedRoute';
import SuperAdminRoute from './route/SuperAdminRoute';
import AdminRoute from './route/AdminRoute';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute><UserPage /></ProtectedRoute> },
        { path: 'songs', element: <ProtectedRoute><Songs /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'users', element: <AdminRoute><Users /></AdminRoute> },
        { path: 'profiles', element: <ProtectedRoute><Profiles /></ProtectedRoute> },
        { path: 'songManager', element: <ProtectedRoute><SongManager /></ProtectedRoute> },
        { path: 'groups', element: <SuperAdminRoute><Groups /></SuperAdminRoute> },
        { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'passwordRecovery',
      element: <PasswordRecovery />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
