import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrders, fetchOrderByIdApi, postOrder } from './orderApi';

const initialState = {
  arrOrder: [],
  cart: [],
  currentOrder: null,
  status: "idle",
  finalPrice: 0,
  numOfItems: 0
};

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (thunkAPI) => {
    const res = await fetchOrders();
    return res;
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, thunkAPI) => {
    const res = await fetchOrderByIdApi(id);
    return res;
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (dataOrder, thunkAPI) => {
    const res = await postOrder(dataOrder);
    return res;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToMyCart: (state, action) => {
      const item = action.payload;
      const existingProduct = state.cart.find(x => x.id === item.id);
      if (existingProduct) {
        existingProduct.qty += item.qty;
        existingProduct.finalPrice = existingProduct.qty * existingProduct.price;
      } else {
        state.cart.push({ ...item, finalPrice: item.qty * item.price });
      }
      state.numOfItems += item.qty;
      state.finalPrice += item.qty * item.price;
    },
    deleteMyCart: (state, action) => {
      state.cart = [];
      state.numOfItems = 0;
      state.finalPrice = 0;
    },
    addQty: (state, action) => {
      let productIndex = state.cart.findIndex(x => x.id === action.payload);
      state.cart[productIndex].qty++;
      state.cart[productIndex].finalPrice += state.cart[productIndex].price;
      state.finalPrice += state.cart[productIndex].price;
      state.numOfItems += 1;
    },
    removeQty: (state, action) => {
      let productIndex = state.cart.findIndex(x => x.id === action.payload);
      if (state.cart[productIndex].qty > 1) {
        state.cart[productIndex].qty--;
        state.cart[productIndex].finalPrice -= state.cart[productIndex].price;
        state.finalPrice -= state.cart[productIndex].price;
        state.numOfItems -= 1;
      }
    },
    removeFromCart: (state, action) => {
      let productIndex = state.cart.findIndex(x => x.id === action.payload);
      state.finalPrice -= state.cart[productIndex].finalPrice;
      state.numOfItems -= state.cart[productIndex].qty;
      state.cart.splice(productIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
      state.arrOrder = payload;
      state.status = "fulfilled";
    });
  },
});

export const { addToMyCart, deleteMyCart, removeFromCart, removeQty, addQty } = orderSlice.actions;

export default orderSlice.reducer;
