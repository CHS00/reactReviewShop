import {Table} from 'react-bootstrap'

import {useDispatch, useSelector} from "react-redux"
// 만든 함수 import하기
import { changeName, plusAge } from '../store/userSlice'
import { plusCount, minusCount, deleteProd } from '../store'

function Cart(){

  // Redux사용 시, 컴포넌트 들이 props없이 state를 공유할 수 있게 된다.

  // store.js에서 만든 state를 가져오는 법
  // useSelector는 store에 있던 state를 가져올 수 있게 하는 함수
  // useSelector((state)=>{return state})
  // 위 형식이 기본문법이다.

  // 특정 state만 가져오고 싶은 경우에는
  // useSelector((state)=>{return state.특정state})

  let allState = useSelector((state)=> state)
  // 이렇게 하면 redux store에 있던 모든 state가 남게 된다.
  // ({}와 return이 함께 있을경우 생략가능)

  // 컴포넌트간 공유가 필요없을때는 그냥 useState를 사용하는게 낫다.


  // useDispatch는
  // state변경함수를 import할 때 store.js로 요청을 보내주는 함수
  let dispatch = useDispatch()

  return (
    <div>
      <h4>
      {allState.user.name}({allState.user.age})의 장바구니
      </h4>
      <button onClick={()=>{
          // state변경함수는 다음과 같이 사용
          dispatch(changeName());
          dispatch(plusAge(10));
        }}>나이+</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            allState.cart.map((prod,i)=>{
              return (
                <tr key={i}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.count}</td>
                  <td>
                    <button onClick={()=>{
                      dispatch(plusCount(prod.id))
                    }}>+</button>
                    <button onClick={()=>{
                      dispatch(minusCount(prod.id))
                    }}> - </button>
                    <button onClick={()=>{
                      dispatch(deleteProd(prod.id))
                    }}> x </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart;