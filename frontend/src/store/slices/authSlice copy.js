// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const token = localStorage.getItem('token');
const initialState = {
  token: token,
  user: token ? decodeToken(token) : null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload;
      const decodedUser = decodeToken(token);
      state.token = token;
      state.user = decodedUser;
      state.error = null;
      localStorage.setItem('token', token);
    },
    loginError: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { loginSuccess, loginError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;