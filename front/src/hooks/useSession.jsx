import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export const SessionContext = createContext([undefined, () => {}]);
const baseUrl = 'http://localhost:3000';

const refreshData = cb => {
  return fetch(baseUrl + '/auth/whoami', {
    credentials: 'include' // to send HTTP only cookies
  }).then(data => {
    data.json().then(json => {
      cb(json);
    });
  });
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    refreshData(json => {
      if (json.user) setSession(json.user);
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
        if (json.user) setSession(json.user);
      });
    }
  };

  const logout = () => {
    fetch(baseUrl + '/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    setSession(null);
  };

  return { user: session, setSession, login, refreshData, logout };
};
