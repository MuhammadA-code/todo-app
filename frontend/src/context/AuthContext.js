import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
axios.defaults.baseURL = 'http://localhost:3000';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchCurrentUser = async (token) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/user');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('Authorization');
      setToken(null)
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('/users', {
        user: {
          email,
          password,
        },
      });
      debugger
      if (response.status === 200) {
        return response.status
      } else {
        console.error("Failed to Register User");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    localStorage.removeItem('Authorization');
    setToken(null)
    try {

      console.log('email:', email)
      console.log('password:', password)

      const response = await axios.post('/users/sign_in', {
        user: {
          email,
          password,
        },
      });
      console.log('response:', response.status)

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('Authorization', `Bearer ${token}`);
        setToken(token);
        fetchCurrentUser(token)
      } else {
        console.error(response.data.status.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const logout = () => {
    localStorage.removeItem('Authorization');
    setToken(null)
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      fetchCurrentUser(localStorage.getItem('Authorization').split(' ')[1]);
    }
  }, []);
console.log('user', user)
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
