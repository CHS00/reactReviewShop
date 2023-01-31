import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {

  }
}) 

// 아래 코드는 store.js 생성시 기본형
// import { configureStore } from '@reduxjs/toolkit'

// export default configureStore({
//   reducer: { }
// }) 

// 제작 후에는 index.js 에서 <Provider store={store}>를 입력