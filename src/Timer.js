import React, { useState, useEffect, useRef } from 'react';
import './Timer.scss';
import { msNormalize } from './utils';

export default function Timer({ run }) {
  const [time, setTime] = useState(0);
  const timerId = useRef(false);
  useEffect(() => {
    if (run) {
      timerId.current = setTimeout(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 100);
    } else {
      setTime((prev) => {
        localStorage.setItem('timeSpent', msNormalize(time));
        return 0;
      });
      clearTimeout(timerId.current);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [run, time]);

  return <span className='timer'>{msNormalize(time)}</span>;
}
