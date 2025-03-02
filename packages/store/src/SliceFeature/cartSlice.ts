import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity : number
}

interface CartState  {
    items: CartItem[];
}

const initialState: CartState = { items: [] };

const createSlices = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addtoCart :  (state, action)=>{
            const item = state.items.find((i)=> i.id === action.payload.id)
            if(item){
                item.quantity += action.payload.quantity
            }else{
                state.items.push(action.payload)
            }
        },

        removeItem : (state, action)=>{
            const item  = state.items.filter((i)=> i.id != action.payload.id)
            state.items = item
        },

        clearCart : (state) => {
            
            state.items = []
        }
        
    }
})

export const { addtoCart, removeItem, clearCart } = createSlices.actions;
export default createSlices.reducer;