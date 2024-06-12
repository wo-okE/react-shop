import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from 'styled-components';

// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
//   padding : 10px;
// `

// class Detail2 extends React.Component {
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
// }

function Detail(props){
    function Sale(){
      return(
        <div className="alert alert-warning">
        2초이내 구매시 할인
      </div>
      )
    }

    useEffect(() => {
      let a = setTimeout(()=>{ setSale(true)},2000)
      
      // useEffect 동작 전 실행됨
      return ()=>{
        clearTimeout(a)
      }
    }) 

    // <input> 하나 만들고 거기에 유저가 숫자 말고 다른걸 입력하면
    // "그러지마세요"라는 안내메세지를 출력해봅시다.
    // 굳이 그럴 필요는 없겠지만 오늘 배운 useEffect 써보는게 어떨까요.
    // (팁) 모르는건 검색해봐야합니다.
    
    // [] 안에 있는 변수가 변할때 useEffect 실행 , **아무것도 없을 시 mount에만 실행됨**
    
    // useEffect(()=>{ })     1. 재렌더링마다 코드 실행
    // useEffect(()=>{ }, []) 2. mount시 1회 코드 실행
    // useEffect(()=>{
          // return()=>{

          // }
    //  }, []) 3. unmount시 1회 코드 실행

    
    let [sale,setSale] = useState(false);
    let [count,setCount] = useState(0);
    let [cnt, setCnt] = useState('');
    
    useEffect(()=>{
      var regex = /^[0-9]*$/;
      if(!regex.test(cnt)){
          alert('그러지마세요');
          setCnt('');
      }
    },[cnt]);

    let {id} = useParams();
    let shoes = props.shoes.find((x)=>{ return x.id == id })

    return (
      <div className="container">
        {sale ? null : <Sale/> }
        {/* <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn> */}
        <button onClick={()=>{ setCount(count+1) }}>버튼</button>
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(shoes.id)+1)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
            <input placeholder="수량" onChange={(e)=>{ setCnt(e.target.value) }}/>
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price + '원'}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div> 
    )
}

  export default Detail;