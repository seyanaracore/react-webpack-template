import { useState } from 'react';
import s from './styles.module.scss';
import type { HelloWorldsProps } from './types';

function HelloWorld({ msg }: HelloWorldsProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3 className={s.messageText}>{msg}</h3>
      <p>{count}</p>
      <button onClick={() => setCount((prevState) => prevState + 1)}>increase</button>
    </div>
  );
}

export default HelloWorld;
