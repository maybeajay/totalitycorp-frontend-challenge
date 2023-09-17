import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, addItem, deleteItem, updateItem } from "./CartApi";
const initialState = {
    items: [],
    status: "idle"
  };
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const res = await fetchProducts();
    return res.data;
  }
);
export const addAsync = createAsyncThunk("cart/AddAsync", async (item) => {
  const { title, price, id, thumbnail, brand } = item;
  const res = await addItem({
    title,
    price,
    id,
    thumbnail,
    brand,
    qunatity: 1,
  });
  console.log(res.data)
  return res.data;
});
export const deleteAsync = createAsyncThunk(
    'cart/deleteItem',
    async (id)=>{
      await deleteItem(id);
      return id;
    }
)
export const updateAsync = createAsyncThunk(
    'cart/updateItem',
    async ({id, change})=>{
      const res = await updateItem(id, change);
      return res.data;
    }
)
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchCartAsync.pending, (state)=>{
            state.status="pending"
        })
        .addCase(fetchCartAsync.fulfilled, (state, action)=>{
            state.status="idle"
            state.items = action.payload
        })
        .addCase(addAsync.fulfilled, (state, action)=>{
            state.status="idle"
            state.items.push(action.payload)
        })
        .addCase(deleteAsync.fulfilled, (state, action)=>{
            state.status="idle"
            const index = state.items.findIndex((item)=>item.id===action.payload.id)
            state.items.splice(index)
        })
        .addCase(updateAsync.fulfilled, (state, action)=>{
            state.status="idle"
            const index = state.items.findIndex(item=>item.id===action.payload.id)
            state.items.splice(index, 1,action.payload)
        })
    }
})
export default cartSlice.reducer;