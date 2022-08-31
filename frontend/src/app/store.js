import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import layoutSlice from '../features/layout/layoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutSlice,
  },
});
