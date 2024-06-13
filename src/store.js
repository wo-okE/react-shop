import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import { changeName, increase } from './store/userSlice'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers : {
        plusCnt(state, action){
            let data = state.find((x)=>{
                return x.id == action.payload
            });
            data.count++
        },
        addItem(state, action){
            let flag = true
            let data = state.find((x)=>{
                if(x.id == action.payload.id){
                    flag = false;
                    return true;
                }
            })

            if(flag){
                state.push(action.payload)
            } else {
                data.count += action.payload.count;
            }
        },
        deleteItem(state, action){
            let index = state.map((state, i)=>{
                if(action.payload == state.id){
                    return i
                }
            })
            state.splice(index,1);
        }
    } 
})

export let { plusCnt, addItem, deleteItem } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
}) 