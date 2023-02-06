import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Info(){
  return(
    <div>
      { 1===1 
      &&<div>
          <h4>회사의 정보</h4><Outlet/>
        </div>
      }
      {/* 앞의 내용이 참이면 &&뒤의 내용을 뱉고,
      거짓이면 null을 뱉으라는 것과 같은 내용 */}
    </div>
  )
}


function AndAnd(){
  
  if (true&&false) {
    // && = 좌우가 모두 true라면 true를 반환하게 하는 연산자
    // true와 자료형을 넣으면 자료형("xxx")이 반환되고
    // false와 자료형을 모두 넣으면 false가 반환된다.

    // 정리하여 설명하면,
    // &&는 연결된 값들 중에 처음등장하는 false값을 찾아주고,
    // false가 없다면 마지막값을 남겨준다. 라고 외우면 된다. 
    console.log(1)
  } 
}


// 현재상태에 따라 다른 탭을 보여주고싶은 경우 사용할 수 있는
// object/array 자료형 응용
// (if를 쓰지않는다)
function Component() {
  let [현재상태,set현재상태] = useState('info');
  return (
    <div>
      {
        { 
          info : <p>상품정보</p>,
          shipping : <p>배송관련</p>,
          refund : <p>환불약관</p>
        }[현재상태]
        // 마지막에 object{} 뒤에 [] 대괄호를 붙이면
        // key값이 현재상태인 자료를 뽑아낸다.
      }
    </div>
  )
} 

// var 탭UI = { 
//   info : <p>상품정보</p>,
//   shipping : <p>배송관련</p>,
//   refund : <p>환불약관</p>
// }

// function Component() {
//   var 현재상태 = 'info';
//   return (
//     <div>
//       {
//         탭UI[현재상태]
//       }
//     </div>
//   )
// } 
// 이와같이 내용을 변수에 저장해서 사용해도 된다.

export default Info