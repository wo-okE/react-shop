import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from '../store/userSlice';
import { plusCnt, deleteItem } from '../store'
import { memo, useMemo, useState } from 'react';

/*memo : 꼭 필요할때만 재렌더링하게하는 함수
        props가 변할 때만 재렌더링 함.
*/
// let Child = memo(function(){
//     console.log(123);
//     return <div>자식임</div>
// })

// function  함수(){
//     return 반복문 10억번 돌린결과
// }

function Cart(){
    let state = useSelector( (state)=> state )
    let dispatch = useDispatch()
    // let [count, setCount] = useState(0)
    
    // let result = 함수();
    // useMemo(()=>{ return 함수()}, [state])      컴포넌트 렌더링시 1회만 실행 ( useEffect와 유사 )

    return (
        <div>
            {/* <Child />
            <button onClick={()=>{ setCount(count+1) }}>+</button> */}

            <h4>{state.user.name} {state.user.age}의 장바구니</h4>
            <button onClick={()=>{
                dispatch(increase(10))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((state,i)=>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{state.name}</td>
                                <td>{state.count}</td>
                                <td><button onClick={()=>{
                                    dispatch(plusCnt(state.id))
                                }}>+</button>
                                </td>
                                <td><button onClick={()=>{
                                    dispatch(deleteItem(state.id))
                                }}>🗑</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;