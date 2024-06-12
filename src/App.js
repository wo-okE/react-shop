import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function App() {

  let [shoes,setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
            <button onClick={()=>{ 
              let copy = [...shoes].sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1 );
              setShoes(copy);
             }}>순서변경</button>
          </Nav>
        </Container>
      </Navbar>

      


      <Routes>
          <Route path="/" element={
            <>
              <div className='main-bg' style={{ backgroundImage : 'url('+ bg +')' }}></div>
              <div className="container">
                <div className="row">
                  {
                    shoes.map(function(shoe,i){
                      return(
                        <Card shoe={shoe} key={i} navigate={navigate}/>
                      )
                    })
                  }
                </div>
              </div>
            </>
          } />
          <Route path='/detail/:id' element={<Detail shoes={shoes} />} />

          <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>멤버임</div>} />
            <Route path='location' element={<About/>} />
          </Route>

          <Route path='/event' element={<EventPage/>}>
            <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
            <Route path='two' element={<p>생일기념 쿠폰받기</p>} />
          </Route>

          {/* <Route path='*' element={<div>없는페이지요</div>} /> */}
      </Routes>

    </div>
  );
}


{/* <img src={process.env.PUBLIC_URL + "/logo192.png" } width="80%" /> */}
function Card(props){
  let id = props.shoe.id;
  return(
    <div style={{ cursor : 'pointer' }} onClick={()=>{ props.navigate('/detail/' + id) }} className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.shoe.id+1)+'.jpg'} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </div>
  )
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;