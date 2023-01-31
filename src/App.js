import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Nav,Navbar} from 'react-bootstrap';
import bgImg from "./img/bg.png"
import { createContext, useState } from 'react';

// 낱개일 경우 import하는 법
// import {변수} from './data'
// 복수일 경우
// import {a,b} from './data'
import data from "./data"

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';

import axios from "axios"
import Loading from "./loading/Loading"

// Redux
import Cart from './routes/Cart';
// redux사용시 store.js 파일을 생성해 주어야한다.


// Context API 1. 함수 외부에 아래와 같이 state보관함을 만들어준다.
// 추가로 외부에서 사용해야하므로 export를 해둔다.
export let Context1 = createContext()


function App() {

  let [shoes,setShoes] = useState(data);

  // 아래와 같이 use어쩌구 하고 시작하는것을 hook이라 한다.
  // hook이란 유용한 내용들이 들어있는 함수를 말한다.
  // useNavigate는 페이지 이동을 도와주는 함수
  let navigate =  useNavigate();

  let [count,setCount] = useState(1);
  let [loading,setLoading] = useState(false);

  
  // Context API (아래의 state를 Detail내부의 TabContent에서 사용)
  let [재고] = useState([10,11,12])

  return (
    <div className="App">

      {/* {변수}, {b} 와 같이 export default된 변수를 가져올 수 있다. */}
      <Navbar bg="white" variant="white">
        <Container>
          <Navbar.Brand href="/">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='page-name'>홈</Link> 
            {/* useNavigate 사용법 */}
            <Nav.Link onClick={()=>{navigate("/detail")}}>상세페이지</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/about")}}>정보</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/cart")}}>장바구니</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      {
        loading?<Loading/>:null //로딩화면
      }

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
            
            {
              count!==3
              ?<button onClick={()=>{

                setLoading(true)
                // ajax를 사용하는 3가지 방법
                // 1. XMLHttpRequest (old)
                // 2.fetch() (new)
                // 3.axios (라이브러리)
                
                // axios를 통한 get요청은 axios를 import한 뒤,
                // 아래와 같이 axios.get("url")
                axios.get("https://codingapple1.github.io/shop/data"+Number(count+1)+".json")
                // 가져온 데이터를 출력할 때는 .then((파라미터)=>{})
                // 파라미터가 가져온 데이터
                .then((result)=>{
                  setLoading(false)

                  console.log(result);
                  let updatedShoes = [...shoes,...result.data];
                  
                  setShoes(updatedShoes);
                  setCount(count+=1)
                })
                // ajax요청을 실패할 경우에 실행할 코드는 catch(()=>{})
                .catch(()=>{
                  setLoading(false)
                  console.log("실패했서요")
                });

                // 서버로 데이터를 전송할 때 사용하는 POST요청
                // axios.post("/url",{name:"보낼 데이터"});

                // ajax요청을 동시에 여러개 하기위해선,
                // ex) axios.get("/url1"); axios.get("/url2");
                // Promise.all([axios.get("/url1"),axios.get("/url2")])
                // .then(()=>{});
                // 두 요청을 모두 성공했을때 아래의 코드를 실행시키게 함

                // 원래 서버와 데이터를 주고받을때는 문자만 주고받을수 있음.
                // 따라서 배열이나 객체 데이터는 주고받을 수 없으나,
                // "{"name":"kim"}" 과 같이 따옴표를 다 쳐두면
                // 문자로 인식하여, 가져올 수 있게 됨.(이를 JSON데이터라 함)

                // 아래는 fetch로, axios없이도 get요청 가능한데,
                // fetch("https://codingapple1.github.io/shop/data2.json")
                // fetch에서 객체등을 가져오기 위해선 아래의 것을 써주어야함
                // 아래의 코드로 json을 array/object로 변환시켜준다.
                // .then(결과=>결과.json())
                // .then(data=>{})
                // 위와같은 번거로움을 없애기 위하여 axios를 사용한다.
              }}>버튼</button>
              :null
            }

          </div>
          
          }/>

          

        {/* :id는 /detail/아무거나 라는 뜻 (URL파라미터라고 함) */}
        <Route path='/detail/:id' element={
          // Context API 2. 작성한 state보관함으로 해당 컴포넌트를 감싼다.
          // (<보관함명.Provider>와 같이 작성)
          // Context API 3. 보관함에 value속성을 열어,
          // 공유를 원하는 state를 {}안에 집어넣어 준다.
          <Context1.Provider value={{재고}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }/>

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
        
        <Route path='/cart' element={<Cart/>}>

        </Route>

      </Routes>



    </div>
  );
}


function Prod(props){

  let navigate =  useNavigate();

  return(
      <div className='col-md-4' onClick={()=>{
        navigate(`/detail/${props.index-1}`)
      }}>
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

//서버에 데이터를 요청하는 법
// 1.방법 (get/post)
// 2.어떤자료 (url형식으로 기입)

// 예를 들어 웹툰의 데이터를 가져오고싶다면
// comic.naver.com으로 get요청을 한다.
// 네이버 서버에 글을 올리고싶다면 
// blog.naver.com으로 post요청을 하여 서버로 데이터를 전달한다.

// 누군가 해당url을 get요청하면 웹툰을 가져다 주게 코드를 짜게 된다.

// 원래는 get/post요청을 할 시, 새로고침이 실행되나,
// ajax를 사용하여 요청할 시, 새로고침이 실행되지않는다.


export default App;
