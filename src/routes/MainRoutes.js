import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
 const Myteam = Loadable(lazy(() => import('views/utilities/Myteam')));
 const Addemp = Loadable(lazy(() => import('views/utilities/Addemp')));
 const Empdetails = Loadable(lazy(() => import('views/utilities/Empdetails')));
 const Chat = Loadable(lazy(() => import('views/utilities/Chat')))
 const Leaverequest = Loadable(lazy(() => import('views/utilities/Leaverequest')))
const Attendance = Loadable(lazy(() => import('views/utilities/Attendance')));
const Holiday = Loadable(lazy(() => import('views/utilities/Holiday')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'Myteam',
      element: <Myteam />
    },
    {
      path: 'Holiday',
      element: <Holiday />
    },
    {
      path: 'Empdetails/:empid',
      element: <Empdetails />
    },
    {
      path: 'Chat',
      element: <Chat />
    },
    {
      path: 'Addemp',
      element: <Addemp />
    },
    {
      path: 'Leaverequest',
      element: <Leaverequest />
    },
    {
      path: 'Attendance',
      element: <Attendance />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        
      ]
    },
    
    {
      path: 'utils',
      
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
  
};

export default MainRoutes;
