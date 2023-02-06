import {Table} from 'react-bootstrap'

import {useDispatch, useSelector} from "react-redux"
// 만든 함수 import하기
import { changeName, plusAge } from '../store/userSlice'
import { plusCount, minusCount, deleteProd } from '../store'
import { memo, useMemo, useState } from 'react'

let Child = memo(function Child(){
  // 원래는 state가 변경되면
  // 페이지가 재렌더링 되면서 모든 자식컴포넌트들도 재렌더링 되지만,
  // 자식컴포넌트의 재렌더링이 계속 된다면 페이지가 무거워질 수 있기 때문에
  // 이처럼 memo를 이용하여 컴포넌트를 선언해주어 사용하게 되면,
  // 특정상황에서만 재렌더링이 되게 할 수 있다.
  // (특정상황 = props가 변할 때)

  // 이러한 memo는 항상 재렌더링이 되기전에 비교작업을 통해,
  // 기존, 신규의 props가 같은지 비교하므로 해당 props가 길거나 복잡하면,
  // memo를 사용하는게 오히려 안좋은 경우가 생길 수 있다. (잘 안쓰긴 함)
  console.log("재렌더링됨")
  return (
    <div>자식임</div>
  )
})

function Fn(){
  return (<div>대충 반복문 10억번 돌아가서 엄청 무거운 함수라 가정</div>)
}

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
  // (state값을 가져올때 사용하면 됨)

  // 컴포넌트간 공유가 필요없을때는 그냥 useState를 사용하는게 낫다.


  // useDispatch는
  // state변경함수를 import할 때 store.js로 요청을 보내주는 함수
  let dispatch = useDispatch()

  let [count,setCount] = useState(0)

  let result = useMemo(()=>{return Fn()},[])
  // 위와 같이 useMemo를 사용하면,
  // 컴포넌트가 렌더링 될 시, 1회만 해당 함수를 실행한다.
  // useEffect(useEffect는 html로딩이 모두 끝나면 실행)와 매우 흡사

  return (
    <div>
      <Child count={count}/>
      <button onClick={()=>{setCount(count+1)}}>재렌더링을 위한 버튼</button>
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