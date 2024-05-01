import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((cart) => cart.bookId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const cart = state.cart.find((cart) => cart.bookId === action.payload);

      cart.quantity++;
      cart.totalPrice = cart.quantity * cart.price;
    },
    decreaseItemQuantity(state, action) {
      const cart = state.cart.find((cart) => cart.bookId === action.payload);

      cart.quantity--;
      cart.totalPrice = cart.quantity * cart.price;

      if (cart.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const totalQuantity = (state) =>
  state.cart.cart.reduce((acc, cart) => acc + cart.quantity, 0);
export const totalPrice = (state) =>
  state.cart.cart.reduce((acc, cart) => acc + cart.totalPrice, 0);
export const getById = (id) => (state) =>
  state.cart.cart.find((cart) => cart.bookId === id)?.quantity ?? 0;
