import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ClientPage from '../components/ClientPage';
import NotesPage from '../components/NotesPage';
import NoteDetailsPage from '../components/NoteDetailsPage';
import NoteForm from '../components/NoteForm';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginFormPage />
      },
      {
        path: "signup",
        element: <SignupFormPage />
      },
      {
        path: "client/:userId",
        element: <ClientPage />,
        children: [
          {
            path: "notes",
            element: <NotesPage />
          },
          {
            path: "notes/:noteId",
            element: <NoteDetailsPage />
          },
          {
            path: "note/new",
            element: <NoteForm />
          },
          {
            path: "note/edit/:noteId",
            element: <NoteForm />
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
