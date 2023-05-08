import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from './pages/Test';
import RegisterPage from './pages/Register';
import Profil from './pages/Profil';
import Post from './pages/Poste';
import Message from './pages/Message';
import Notif from './pages/Notif';
import Accueil from './pages/Accueil';
import Admin1 from './pages/Admin';
import ListGroup from './pages/ListGroup';
import { SessionProvider } from './hooks/useSession';
import Follows from './pages/Follows'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Accueil />
  },
  {
    path: '/App',
    element: <App />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/profil',
    element: <Profil info="with-post" />
  },
  {
    path: '/profil/with-replies',
    element: <Profil info="with-replies" />
  },
  {
    path: '/post/:id',
    element: <Post />
  },
  {
    path: '/messagerie',
    element: <Message />
  },
  {
    path: '/notif',
    element: <Notif />
  },
  {
    path: '/admin',
    element: <Admin1 />
  },
  {
    path: '/group/:id_tl_group',
    element: <Accueil />
  },
  {
    path: '/follows/:id_user',
    element: <Follows />
  },
  {
    path: '/profil/:id_other_user',
    element: <Profil otherProfil={true}/>
  },
  {
    path: '/viewGroups',
    element: <ListGroup />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
