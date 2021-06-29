import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [
  {
    slug: 'zx7-speaker',
    quantity: 3,
    productImage:
      '//images.ctfassets.net/febpdaznqgsb/4jaqkBYfIxFNIHPasJQWcY/25659e8aeedaca5d564e864fc061f6ce/image-product.jpg',
    price: 3500,
    name: 'ZX7 speaker',
    category: 'speaker',
  },
  {
    slug: 'xx99-mark-ii-headphones',
    quantity: 3,
    productImage:
      '//images.ctfassets.net/febpdaznqgsb/2o2s5O2yCWs48xHeDCSTrf/0d43e8fd593edec4bbfa7b10583b7e04/image-product.jpg',
    price: 2999,
    name: 'xx99 mark II headphones',
    category: 'headphone',
  },
  {
    slug: 'yx1-earphones',
    quantity: 1,
    productImage:
      '//images.ctfassets.net/febpdaznqgsb/1ZO56SKu8pkpN4yhP5POra/c0056d0ec5b6264aea314994df5bfbbc/mobile-image-product.jpg',
    price: 599,
    name: 'yx1 earphones',
    category: 'earphone',
  },
];

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
