import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { fetchProducts, postProduct, fetchProductByIdApi, putProductA } from './productApi'

const initialState = {
  arrProducts: [],
  status: "idle",
  currentProduct: null
}

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const res = await fetchProducts();
    return res;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const res = await fetchProductByIdApi(id);
    return res;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (dataProduct) => {
    const res = await postProduct(dataProduct);
    return res;
  }
);

export const putProduct = createAsyncThunk(
  'product/putProduct',
  async ({ id, newProduct }) => {
    const res = await putProductA(id, newProduct);
    return res;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        state.arrProducts = payload;
        state.status = "fulfilled";
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.currentProduct = payload;
      });
  },
});

export default productSlice.reducer;
