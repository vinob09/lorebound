import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ClientPage from '../components/ClientPage';
import NotesPage from '../components/NotesPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "client/:userId",
        element: <ClientPage />,
        children: [
          {
            path: "notes",
            element: <NotesPage />
          }
        ]
      },
      // wildcard catch all
      {
        path: "*",
        element: <LandingPage />
      }
    ],
  },
]);
