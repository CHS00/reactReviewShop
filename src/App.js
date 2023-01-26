import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,Nav,Navbar, Row, Col} from 'react-bootstrap';
import bgImg from "./img/bg.png"


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">상품</Nav.Link>
            <Nav.Link href="#pricing">결제</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{backgroundImage : `url(${bgImg})`}}></div>
      <Row>
        <Col sm>
          {/* 이미지 소스를 하나하나 import하기 버거운 경우 */}
          {/* public내부의 이미지를 아래와 같이 불러올 수 있다. */}
          <img src={process.env.PUBLIC_URL + "/shoes1.jpg"} width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col sm>
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col sm>
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
      </Row>
    </div>
  );
}

export default App;
