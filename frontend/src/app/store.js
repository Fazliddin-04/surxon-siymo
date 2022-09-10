import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import layoutReducer from '../features/layout/layoutSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    layout: layoutReducer,
    cart: cartReducer,
  },
});
