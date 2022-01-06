import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {increment, decrement, incrementByAmount} from '../../redux/counter/counterSlice';

export default function Counter() {
  const countValue = useSelector(state => state.counter.value);
  const [amount, setAmount] = useState(3);

  const dispatch = useDispatch();

  console.log(countValue);

  return (
    <div>
      <h1>
        {countValue}
      </h1>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(increment())}>Increment</button>

      <br />
      <br />

      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={() => dispatch(incrementByAmount(amount))}>Increment by amount</button>
    </div>
  )
}
