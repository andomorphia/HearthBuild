import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, DELETE_USER } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Log in user
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;

      // Save token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set to Authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Log out user
export const logoutUser =  () => dispatch => {
  // Remove token fom localStorage
  localStorage.removeItem('jwtToken');
  // Remove the Authorization header for future requests
  setAuthToken(false);
  // Set current user to {} - isAuthenticated to false
  dispatch(setCurrentUser({}));

}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Delete user
export const deleteUser = userId => ({
  type: DELETE_USER,
  payload: userId
})