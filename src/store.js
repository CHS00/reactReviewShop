import { configureStore, createSlice } from '@reduxjs/toolkit'

// state만드는 법은 userSlice.js 참고
import user from './store/userSlice'


let stock = createSlice({
  name : "stock",
  initialState : [10,11,12]
})

let cart = createSlice({
  name : "cart",
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] ,
  reducers:{
    plusCount(state, action){
      let now = state.find((value)=>value.id===action.payload);
      now.count += 1
    },
    minusCount(state, action){
      let num = state.findIndex((value)=>value.id===action.payload);
      state[num].count --
    },
    deleteProd(state, action){
      let num = state.findIndex((value)=>value.id===action.payload);
      state.splice(num,1)
    },

    addProd(state,action){
      if (state.some((value)=>value.id===action.payload.id)) {
        let num = state.findIndex((value)=>value.id===action.payload.id);
        state[num].count ++
      }else{
        state.push({
          id:action.payload.id,
          name:action.payload.title,
          count:1
        });
      }
    }
  }
})

export let {plusCount,minusCount,addProd,deleteProd} = cart.actions;


export default configureStore({
  reducer: {
    // createSlice에서 만든 state는 이곳에 등록을 해야 사용 가능하다.
    // 작명 : user.reducer <다음 형식을 지킬것 (.reducer를 붙이는 게 중요)
    user : user.reducer,
    // 위 state를 cart라는 컴포넌트에서 쓴다.

    stock : stock.reducer,
    cart : cart.reducer,
  }
}) 

// 아래 코드는 store.js 생성시 기본형
// import { configureStore } from '@reduxjs/toolkit'

// export default configureStore({
//   reducer: { }
// }) 

// 제작 후에는 index.js 에서 <Provider store={store}>를 입력