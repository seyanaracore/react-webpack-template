import { useState } from 'react';
import s from './styles.module.scss';
import { HelloWorldsProps } from './types';

const HelloWorld = <T extends string>({ msg }: HelloWorldsProps<T>) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3 className={s.messageText}>{msg}</h3>
      <p>{count}</p>
      <button onClick={() => setCount((count) => count + 1)}>increase</button>
    </div>
  );
};

export default HelloWorld;
