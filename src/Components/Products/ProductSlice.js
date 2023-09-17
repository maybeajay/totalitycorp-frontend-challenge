import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./ProductApi";
const initialState = {
    products: [],
    status: "idle"
};
export const getproductsAsync = createAsyncThunk(
    "product/getProducts",
    async () => {
      const res = await getProducts();
      return res.data.products;
    }
);
export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getproductsAsync.pending, (state)=>{
            state.status='pending'
        })
        .addCase(getproductsAsync.fulfilled, (state, action) => {
            state.status="idle"
            state.products=action.payload
          })
    }
})
export default productSlice.reducer;
