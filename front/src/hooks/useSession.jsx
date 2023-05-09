import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getBaseUrl } from '../utils/config';

export const SessionContext = createContext([undefined, () => {}]);
const baseUrl = `${getBaseUrl()}:3000`;

const refreshData = cb => {
  return fetch(getBaseUrl() + '/auth/whoami', {
    credentials: 'include' // to send HTTP only cookies
  }).then(data => {
    data.json().then(json => {
      cb(json);
    });
  });
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, isLoggedIn: null });

  useEffect(() => {
    refreshData(json => {
      if (json.user) setSession({ user: json.user, isLoggedIn: true });
      else setSession({ user: null, isLoggedIn: false });
    });
  }, []);

  return <SessionContext.Provider value={[session, setSession]}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const [session, setSession] = useContext(SessionContext);

  const login = async (username, password) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', username);
    urlencoded.append('password', password);

    const data = await fetch(baseUrl + '/auth/login', {
      credentials: 'include',
      method: 'POST',
      body: urlencoded
    });

    const json = await data.json();
    if (json.success) {
      refreshData(json => {
        if (json.user) setSession({ user: json.user, isLoggedIn: true });
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    fetch(baseUrl + '/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    setSession({ user: null, isLoggedIn: false });
  };

  return { user: session.user, isLoggedIn: session.isLoggedIn, setSession, login, refreshData, logout };
};
