import React, { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPonits from '@services/api/';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const signIn = async (email, password) => {
    const options = {
      Headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const { data: access_token } = await axios.post(endPonits.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPonits.auth.profile);
      setUser(user);
    }
  };

  const refreshLogIn = async () => {
    const token = Cookie.get('token');
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPonits.auth.profile);
      setUser(user);
      changeLogInState(true);
    } else {
      const rutaActual = router.pathname;
      if (!logInState && rutaActual != '/login' && rutaActual != '/') {
        router.push('/login');
      }
    }
  };

  const [failLogin, setFailLogin] = useState(false);
  const failLoginController = (estado) => {
    setFailLogin(estado);
  };

  const [logInState, setLogInState] = useState(false);
  const changeLogInState = (logInS) => {
    setLogInState(logInS);
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    failLogin,
    failLoginController,
    logInState,
    changeLogInState,
    refreshLogIn,
    logout,
  };
}
