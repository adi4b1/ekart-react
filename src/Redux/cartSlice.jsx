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
            const existingItem = state.cart.find(item => item.id === action.payload);
            if (!existingItem) {
                state.cart.push(action.payload);
            }
        },
        removeProduct:(state,action)=>{
            state.cart=state.cart.filter((item)=>item.id!==action.payload)
        },

        addMore:(state,action)=>{
            const product=state.sameitemcart.find((item)=>item.id===action.payload)
            if(product){
                product.length+=1
            }else{
                state.sameitemcart.push(action.payload)
            }
        },

        removeitemfromaddMore:(state,action)=>{
            const getProducts=state.sameitemcart.filter((item)=>item.id===action.payload)
            // state.sameitemcart=state.sameitemcart.filter((item)=>item.id!==action.payload)
            if(getProducts.length>0){
                state.sameitemcart.pop(getProducts)
            }else{
                state.sameitemcart=[]
            }
        }


        
    }
})


export const{addProduct,removeProduct,addMore,removeitemfromaddMore}=productCart.actions

export default productCart.reducer