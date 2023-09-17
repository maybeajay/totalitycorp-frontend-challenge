import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../Components/Products/ProductSlice'
import CartReducer from '../Components/Cart/CartSlice'
export const store = configureStore({
    reducer:{
        product: ProductReducer,
        cart: CartReducer
    }
})