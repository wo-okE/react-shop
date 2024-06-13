import { createContext, Suspense, lazy, useState, useDeferredValue } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

// export let Context1 = createContext()

const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))


function App() {

  //useTransition 훅으로 느린 컴포넌트로 성능향상 가능 , ( 코드시작을 뒤로 미뤄줌 오래걸리는 코드에 넣기 )
  /**function App(){
   * let [name, setName] = useState('')
   * 
   * let [isPending, startTransition] = useTransition()
   *  startTransition 가 처리 중일때 isPending은 true
   *  isPending ? '로딩중' : 코드
   * 
   * let state = useDeferredValue(state) // 이 함수 안에 있는 state는 늦게 처리됨
   * 
   * 
   * return(
   *  <div className="App">
   *    <input onChange={(e)=>{ startTransition(()=>{setName(e.target.value)) } }}/>
   *    {
   *      ??.map(()=> <div>{name}</div> ) 만번 반복
   *    }
   *  </div>
   * )
   * }
   */

  // localStorage에 5메가까지 문자 저장 가능
  // localStorage.setItem('data',JSON.stringify(obj));
  // let R = localStorage.getItem('data');
  // R = JSON.parse(R);
  // console.log(R.name);

  let [shoes,setShoes] = useState(data);
  let [clicked, setClicked] = useState(2);
  let [재고] = useState([10,11,12])
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      console.log('요청됨')
      return a.data
    })
  })

  // result.data // ajax 성공 시 위 useQuery
  // result.isLoading // 로딩 중
  // result.error // 실패 시

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>

      

      <Suspense fallback={<div>로딩중임</div>}>
      <Routes>
          <Route path="/" element={
            <>
              <div className='main-bg' style={{ backgroundImage : 'url('+ bg +')' }}></div>
              <div className="container">
                <div className="row">
                  {
                    shoes.map(function(shoe,i){
                      return <Card shoe={shoe} key={i} navigate={navigate}/>
                    })
                  }
                </div>
              </div>
              <PlusBtn 
                clicked={clicked} 
                shoes={shoes} 
                setClicked={setClicked} 
                setShoes={setShoes} />
            </>
          } />
          <Route path='/detail/:id' element={
            // <Context1.Provider value={{ 재고, shoes }}>
            <Detail shoes={shoes}/>
            // </Context1.Provider>  
          } />
          <Route path='/cart' element={<Cart />} />
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
      </Suspense>
          
    </div>
  );
}

function PlusBtn(props){
  if(props.clicked == 4){
    return null
  }
  return (
  <button onClick={()=>{
    
    axios.get('https://codingapple1.github.io/shop/data' + props.clicked +'.json')
    .then((result)=>{
      let copy = [...props.shoes, ...result.data];
      props.setShoes(copy);
      props.setClicked(props.clicked+1)
    })
    .catch(()=>{
      console.log('실패함')
    });
    
    // post 및 파라미터 보내기
    // axios.post('/RequestMapping', {
    //   name : 'kim',
    //   age : 20
    // })

    // 여러개 ajax 통신 방법
    // Promise.all([axios.get('/url1'),axios.get('/url2')])
    // .then(()=>{

    // })
    // .catch(()=>{

    // })


  }}>더보기</button>
  )
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