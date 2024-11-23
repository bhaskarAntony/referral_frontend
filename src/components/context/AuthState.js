import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
// import AuthContext from './AuthContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../../types';
import Loading from '../loading/Loading';
import AuthContext from './AuthContext';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/auth`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
      return false;
    }
  };
  useEffect(()=>{
    loadUser()
  }, [])

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/register`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Set token in the auth header after successful registration
      setAuthToken(res.data.token);
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      });
    }
  };


// Login User
const login = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`http://localhost:5000/api/auth/login`, formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Set token in the auth header after successful login
    setAuthToken(res.data.token);
    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message,
    });
  }
};

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT })
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  if(state.loading){
    return <Loading/>
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
