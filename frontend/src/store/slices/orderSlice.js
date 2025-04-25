// store/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    credits: parseInt(localStorage.getItem('credits') || '0')
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // Ajoute la nouvelle commande au début
      state.credits += action.payload.credits;
      localStorage.setItem('orders', JSON.stringify(state.orders));
      localStorage.setItem('credits', state.credits.toString());
    },
    addCredits: (state, action) => {
      state.credits += action.payload;
      localStorage.setItem('credits', state.credits.toString());
    },
    updateCredits: (state, action) => {
      state.credits = action.payload;
      localStorage.setItem('credits', action.payload.toString());
    },
    clearOrders: (state) => {
      state.orders = [];
      state.credits = 0;
      localStorage.removeItem('orders');
      localStorage.removeItem('credits');
    }
  }
});

export const { addOrder, addCredits, updateCredits, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;