import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const findItem = state.find((element) => element.slug === item.slug);
      if (findItem !== undefined) {
        const newItem = {
          ...findItem,
          quantity: findItem.quantity + item.quantity,
        };
        const newState = state.map((e) =>
          e.slug === newItem.slug ? newItem : e
        );
        return newState;
      }
      return [...state, item];
    },
    remove: (state, action) => {
      const item = action.payload;
      const findItem = state.find((element) => element.slug === item.slug);
      const newItem = {
        ...findItem,
        quantity: findItem.quantity - 1,
      };
      if (newItem.quantity > 0) {
        const newState = state.map((e) =>
          e.slug === newItem.slug ? newItem : e
        );
        return newState;
      } else {
        const newState = state.filter((e) => e.slug !== newItem.slug);
        return newState;
      }
    },
    removeAll: (state) => {
      const newState = [];
      return newState;
    },
  },
});

export const { add, remove, removeAll } = cartSlice.actions;
export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
