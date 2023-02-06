import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import {Nav} from 'react-bootstrap';

// Context API 5. Context API를 사용하기 위해 보관함을 import한다.
import  {Context1}  from "../App";

import { useDispatch, useSelector } from "react-redux";

import { addProd, addWatched } from "../store";
// 위와 같이 styled components를 사용하면,
// 해당 스타일이 다른 js로 오염되지 않는다.
// 또한 페이지 로딩시간도 단축시켜준다.
let YellowBtn = styled.button`
    background : ${props => props.bg };
    color : ${props => props.bg=="blue"?"white":"black"};
    padding : 10px;
`
// YellowBtn을 사용할때 bg라는 props를 사용할 수 있다고 선언하는 것
// (그냥 라이브러리 사용법이므로 외울 필요는 없음.)


// Lifecycle
// 페이지가 보이는 순간 = mount
// 페이지가 업데이트 되는 것 = update
// 페이지를 이동하여 컴포넌트가 보이지않게 되며 사라지는것 = unmount

function Detail(props){



    let [count,setCount] = useState(0)
    let [alert2,setAlert2] = useState(true)

    let [num,setNum] = useState("")

    let [tab,setTab] = useState(0)

    let [fade, setFade] = useState("")

    useEffect(()=>{
        let a = setTimeout(() => {
            setAlert2(false);
        }, 2000);
        // 아래와 같이 return을 넣으면
        // useEffect가 실행되기전에 내부의 코드가 실행된다.
        console.log(2)

        if (isNaN(num)) {
            alert("숫자만 쓰세요")
        }
            // useEffect속의 return ()=>{}은 clean up function이라 한다.
        return ()=>{
            console.log(1)
            // 보통 기존의 코드를 제거 해둘때 자주 사용한다.(clean up fn)
            // 아래와 같이 타이머를 삭제해둘수 있다.
            // (clean up function은 mount시에는 실행되지않고,
            // unmount시에 실행된다.)
            clearTimeout(a);
            // 다른 예로는 서버로 데이터를 요청하는 코드가 있다 했을 때,
            // 데이터를 가져오는 도중에 몇번씩 재랜더링이 된다면
            // 수개의 데이터 요청이 발생하므로
            // 기존 데이터 요청은 제거해주는 코드를 입력할 수 있을 것이다.
        }
        // []내부에 useEffect의 실행조건을 넣을 수 있다.
        // 아래와 같이 작성 시, count가 변할 때만 실행된다.
        // []를 비워놓으면 mount, update가 아니라 mount시에만 실행된다.
    },[count,num])
    // useEffect는 mount, update시 코드를 실행해주는 기능
    // 내부의 코드는 html이 모두 랜더링 된 뒤에 실행된다.
    
    // 예를 들어 내부에 위와같이 코드를 입력하면 아래의
    // console.log("안녕")이 먼저 실행되고 나서,
    // useEffect 내부의 코드가 실행된다.

    // 보통은 어려운 연산이나 서버에서 데이터를 가져오는 작업,
    // 타이머 장착 등에 사용한다.
    // console.log("안녕")

    // useEffect를 정리하자면,
    // useEffect(()=>{  }) 1.재랜더링마다 코드를 실행하고 싶은 경우.
    // useEffect(()=>{  },[]) 2.mount시 1회 코드 실행하고 싶은 경우.
    // useEffect(()=>{
    //     return()=>{ xx }
    // }) 3.unmount시 1회 코드 실행하고 싶은 경우.
    // 4.useEffect실행 전에 뭔가 실행하려면 언제나 return()=>{}
    // 5.특정 state변경 시에만 실행하려면 [state명]
    


    // useParams은 현재 url의 파라미터정보들을 가져온다(use~~이므로 훅임)
    // 유저가 :id 자리에 적은것을 가져와 줌
    let {id} = useParams();
    let nowshoes = props.shoes.find((value)=>value.id==id);

    useEffect(()=>{
        setFade("end")
    },[])

    let dispatch = useDispatch()

    useEffect(()=>{
        let putout = localStorage.getItem("watched")
        putout = JSON.parse(putout)
        putout.push(nowshoes.id);
        putout = [...new Set(putout)];
        localStorage.setItem("watched", JSON.stringify(putout))
    },[])

    return(
        <div className={`container start ${fade}`}>
            {alert2?
            <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div>:
            null}
            

            {count}
            <button onClick={()=>{setCount(count+1)}}>useEffect를 알아보기위한 버튼</button>

            <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="yellow">버튼</YellowBtn>
            <input type="text" className="input" onChange={
                (e)=>{setNum(e.target.value)}
            }/>

            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+Number(nowshoes.id+1)+".jpg"} width="100%" />
                </div>


                <div className="col-md-6">
                    <h4 className="pt-5">{nowshoes.title}</h4>
                    <p>{nowshoes.content}</p>
                    <p>{nowshoes.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addProd(nowshoes));
                        console.log(nowshoes)
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav fill variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{setTab(0)}}>1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{setTab(1)}}>2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{setTab(2)}}>3</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} shoes={props.shoes}/>

        </div> 
    )
}

function TabContent({tab}) {
    // 위처럼 중괄호안에 props를 전달하면 아래에 props를 입력하지않아도 된다.
    
    // props가 아래 컴포넌트들로 계속해서 중첩되는것이 비효율적일 경우,
    // 1. Context API (리액트 기본문법) (많은 이슈들로 잘 사용하지 않음.)
    // 2. Redux (라이브러리)
    let [fade,setFade] = useState("");


    // Context API 6. useContext(만든보관함)을 입력함으로
    // 상위 state를 사용할 수 있게 함.
    // useContext는 쉽게 말해 보관함을 해체해주는 역할
    let {재고, shoes} = useContext(Context1);

    useEffect(()=>{
        setTimeout(() => {
            setFade("end");
        }, 100);

        // state(tab)가 변경될때마다 코드를 실행시켜야하므로 useEffect사용
        return ()=>{
            setFade("")
        }
        // 위와같이 따로 실행시키는 이유는
        // 리액트는 state변경이 한번에 실행시켜진 뒤 재랜더링 되기때문에
        // (automatic batching) 시간차를 주어 의도대로 실행되게 한다.
    },[tab])
    
    return(
        // 변수를 문자 중간에 넣으려면 {}넣는다는 점 기억하기
        <div className={`start ${fade}`}>
            {/* Context API 확인 */}
            {[<div>{재고[0]}</div>,<div>내용2</div>,<div>내용3</div>][tab]}
        </div>
    )
    // if (tab == 0) {
    //     return (<div>내용1</div>)
    // }else if (tab == 1) {
    //     return (<div>내용2</div>)
    // }else if (tab == 2) {
    //     return (<div>내용3</div>)
    // }
}

// 전환애니메이션 만들기 4단계
// 1. 애니메이션 동작 전 className 만들기 (css)
// 2. 애니메이션 동작 후 className 만들기
// 3. className에 transition 속성 추가
// 4. 원할 때 2번 className 부착

// Context API
// state변경시 쓸데없는것까지 모두 재랜더링하는 것(성능이슈)
// 나중에 다른 페이지에서 해당 컴포넌트를 import하거나 하면 꼬이기 쉬움.
// 위와 같은 이유로 Context API는 잘 사용되지 않고 Redux 등을 사용한다.


// 개발자도구
// react developer tools
// props, state확인에 용이, 딜레이 발생점 탐색가능
// redux devtools
// state 실시간 변경 확인에 용이
export default Detail;