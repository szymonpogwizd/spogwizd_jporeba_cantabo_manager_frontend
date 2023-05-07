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
import Playlist from './pages/Playlist';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'songs', element: <Songs /> },
        { path: 'categories', element: <Categories /> },
        { path: 'users', element: <Users /> },
        { path: 'profiles', element: <Profiles /> },
        { path: 'songManager', element: <SongManager /> },
        {path: 'groups', element: <Groups/> },
        {path: 'playlist', element: <Playlist/> },
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
