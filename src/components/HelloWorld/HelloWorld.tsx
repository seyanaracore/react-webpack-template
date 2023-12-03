/* eslint-disable import/no-duplicates */
import { useState } from 'react';
import s from './styles.module.scss';
import reactIconPath from '@/assets/icons/react-icon.svg?url';
import ReactIcon from '@/assets/icons/react-icon.svg';
import jsLogo from '@/assets/imgs/js-logo.png';
import type { HelloWorldsProps } from './types';

function HelloWorld({ msg }: HelloWorldsProps) {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prevState) => prevState + 1);
  };

  return (
    <>
      <div>
        <h3 className={s.messageText}>{msg}</h3>
        <ReactIcon
          color="red"
          width={32}
          height={32}
        />
        <img
          src={reactIconPath}
          alt="react icon"
          width={32}
          height={32}
        />
        <p>{count}</p>
        <button onClick={increase}>increase</button>
      </div>
      <img
        src={jsLogo}
        alt="js logo"
      />
    </>
  );
}

export default HelloWorld;
