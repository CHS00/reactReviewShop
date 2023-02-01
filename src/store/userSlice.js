import { createSlice } from "@reduxjs/toolkit"

// createSlice는 useState와 같은 역할
let user = createSlice({
  // 중괄호 내부에는 state입력
  // name: "state의 이름",
  // initialState : "state의 값"
  // 위 state하나를 slice라고 부른다.

  name: "user",
  initialState : {name : "kim", age:20},

  // redux의 state를 변경하는법
  // 1.state를 수정하는 함수를 만들고,
  // 2.원할 때 그 함수를 실행해달라고 store.js에 요청
  // 아래의 reducers에 함수 기입.
  reducers :{
    // 파라미터로 들어가는 것은 기존 state.
    changeName(state){
      state.name = "park"
      // return의 값으로 기존 state를 갈아치움
    },
    // 함수를 만든 후에는 해당 함수를 export해주어야 한다.

    // state변경 함수에 파라미터를 뚫는법
    // 파라미터를 추가한 뒤,
    plusAge(state, action){
      // 사용할 파라미터를 입력하고 뒤에 .payload를 붙여준다.
      state.age += action.payload
      // 이처럼 하면 dispatch(plusAge(10))라 했을때, 10씩 더해줄 수 있다.
      // (여담으로 dispatch(메세지를 보내다)로 함수를 보내달라 요청하면,
      // payload(화물)과 함께 함수를 보내는것이라 외울 것)
      console.log(state)
    }
  }
})

// export하는 법
export let {changeName,plusAge} =  user.actions
// (오른쪽 자료들을 변수로 export하는 법)
// .actions에는 state변경함수들이 들어간다.
// (state변경함수를 action이라한다.)

export default user