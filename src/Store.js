import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../src/Redux/cartSlice'
export const store=configureStore({
    reducer:{
        addCart:cartReducer
    }
})