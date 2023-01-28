import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Nav,Navbar} from 'react-bootstrap';
import bgImg from "./img/bg.png"
import { useState } from 'react';

// 낱개일 경우 import하는 법
// import {변수} from './data'
// 복수일 경우
// import {a,b} from './data'
import data from "./data"

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';



function App() {

  let [shoes] = useState(data);

  // 아래와 같이 use어쩌구 하고 시작하는것을 hook이라 한다.
  // hook이란 유용한 내용들이 들어있는 함수를 말한다.
  // useNavigate는 페이지 이동을 도와주는 함수
  let navigate =  useNavigate();

  return (
    <div className="App">

      {/* {변수}, {b} 와 같이 export default된 변수를 가져올 수 있다. */}
      <Navbar bg="white" variant="white">
        <Container>
          <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='page-name'>홈</Link> 
            {/* useNavigate 사용법 */}
            <Nav.Link onClick={()=>{navigate("/detail")}}>상세페이지</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/about")}}>정보</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      {/* 라우터를 쓸때는 index.js에서 BrowserRouter 추가 */}
      <Routes>
        {/* element내에 html작성 */}
        <Route path='/' element={
          <div className='row'>
              {/* 이미지 소스를 하나하나 import하기 버거운 경우 */}
              {/* public내부의 이미지를 아래와 같이 불러올 수 있다. */}
              {/* <img src={process.env.PUBLIC_URL + "/shoes1.jpg"} width="80%"/> */}
            <div className='main-bg' style={{backgroundImage : `url(${bgImg})`}}></div>
            {
              shoes.map((shoe,i)=>{
                return(
                  <Prod product={shoes[i]} index={i+1} key={i}/>
                )
              })
            }
          </div>
          }/>

        {/* :id는 /detail/아무거나 라는 뜻 (URL파라미터라고 함) */}
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>

        {/* 404페이지 만들기 */}
        <Route path='*' element={<div>없는페이지입니다</div>}/>

        {/* 아래와 같이 사용시, /about/member와 같이 만들 수 있다. */}
        {/* 이와 같은 것을 nested routes라고 한다. */}
        {/* 아래에서 <Outlet/>을 사용함으로써 발현 */}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버</div>}/>
          <Route path='location' element={<div>위치정보</div>}/>
        </Route>


        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>양배추즙</div>}/>
          <Route path='two' element={<div>생일쿠폰</div>}/>
        </Route>

      </Routes>



    </div>
  );
}


function Prod(props){

  return(
      <div className='col-md-4'>
        <img 
        src={"https://codingapple1.github.io/shop/shoes"+props.index+".jpg"} 
        width="80%"/>
        <h4>{props.product.title}</h4>
        <p>{props.product.price}</p>
      </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사의 정보</h4>
      <Outlet/>
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>이벤트</h4>
      <Outlet/>
    </div>
  )
}


export default App;
