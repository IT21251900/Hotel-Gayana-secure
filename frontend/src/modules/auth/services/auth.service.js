import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import SETTINGS from '../../../config/common.settings';
import EncryptionService from '../../../services/encryption.services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const encryption = new EncryptionService();

  const login = async (payload) => {
    try {
      const response = await axios.post(`${SETTINGS.BASE_API}/api/login`, payload);
      setSession(response.data);
    } catch (error) {
      throw error.response.data;
    }
  };

  const setSession = (authResult) => {
    const { access_token, refresh_token, user } = authResult;
    setLoggedInUser(JSON.stringify(user));
    localStorage.setItem(SETTINGS.ACCESS_TOKEN, encryption.encrypt(access_token));
    localStorage.setItem(SETTINGS.REFRESH_TOKEN, encryption.encrypt(refresh_token));
    setIsAuthenticated(true);
  };

  const setLoggedInUser = (userStr) => {
    localStorage.setItem(SETTINGS.LOGGED_IN_USER, encryption.encrypt(userStr));
  };

  const getLoggedInUser = () => {
    const userStrEnc = localStorage.getItem(SETTINGS.LOGGED_IN_USER);
    return JSON.parse(encryption.decrypt(userStrEnc));
  };

  const isLoggedIn = () => {
    const tokenENC = localStorage.getItem(SETTINGS.ACCESS_TOKEN);
    if (tokenENC) {
      try {
        return encryption.decrypt(tokenENC);
      } catch (e) {
        logout();
      }
    }
    return false;
  };

  const getToken = () => {
    const tokenENC = localStorage.getItem(SETTINGS.ACCESS_TOKEN);
    if (tokenENC) {
      try {
        return encryption.decrypt(tokenENC);
      } catch (e) {
        return '';
      }
    }
    return '';
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${SETTINGS.BASE_API}/user/refresh-token`, {
        refreshToken: getRefreshToken(),
      });
      localStorage.setItem(SETTINGS.ACCESS_TOKEN, encryption.encrypt(response.data.access_token));
      return response.data;
    } catch (err) {
      localStorage.clear();
      window.location.href = '/admin';
      throw err;
    }
  };

  const getRefreshToken = () => {
    const refreshTokenENC = localStorage.getItem(SETTINGS.REFRESH_TOKEN);
    if (refreshTokenENC) {
      try {
        return encryption.decrypt(refreshTokenENC);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const logout = () => {
    axios.post(`${SETTINGS.BASE_API}/admin/logout`).finally(() => {
      localStorage.clear();
      window.location.href = '/admin';
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        setLoggedInUser,
        getLoggedInUser,
        isLoggedIn,
        getToken,
        refreshToken,
        logout,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
