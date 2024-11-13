import {createSlice} from '@reduxjs/toolkit'

const initialState={
    cart:[],
    sameitemcart:[]
}

export const productCart=createSlice({
    name:'addCart',
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.cart.push(action.payload);
            }
        },
        removeProduct:(state,action)=>{
            state.cart=state.cart.filter((item)=>item.id!==action.payload)
        },

        addMore:(state,action)=>{
            state.sameitemcart.push(action.payload)
        },

        removeitemfromaddMore:(state,action)=>{
            state.sameitemcart=state.sameitemcart.filter((item)=>item.id!==action.payload)
        }


        
    }
})


export const{addProduct,removeProduct,addMore,removeitemfromaddMore}=productCart.actions

export default productCart.reducer