import React, { useState } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => setLoggedIn(false);

  return (
    /* eslint-disable-next-line */
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
