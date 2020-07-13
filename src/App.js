import React, { useState, useEffect } from 'react';
import './App.scss';
import Timer from './Timer';

const colors = [
  { bg: '#00ffff', text: '#000' },
  { bg: '#808080', text: '#fff' },
  { bg: '#000080', text: '#fff' },
  { bg: '#c0c0c0', text: '#000' },
  { bg: '#000000', text: '#fff' },
  { bg: '#008000', text: '#fff' },
  { bg: '#808000', text: '#fff' },
  { bg: '#008080', text: '#fff' },
  { bg: '#0000ff', text: '#fff' },
  { bg: '#00ff00', text: '#000' },
  { bg: '#800080', text: '#fff' },
  { bg: '#ffffff', text: '#000' },
  { bg: '#ff00ff', text: '#000' },
  { bg: '#800000', text: '#fff' },
  { bg: '#ff0000', text: '#fff' },
  { bg: '#ffff00', text: '#000' },
  { bg: '#663399', text: '#fff' },
  { bg: '#2f4f4f', text: '#fff' },
];

function App() {
  const [difficulty, setDifficulty] = useState(4);
  const [timer, setTimer] = useState(false);
  const [ceils, setCeils] = useState({});
  const [openedCeils, setOpenedCeil] = useState(0);
  const [gameStatus, setGameStatus] = useState(false);
  const [openCeilValues, setOpenCeilValues] = useState([]);

  useEffect(() => {
    if (openedCeils === difficulty * difficulty) setTimer(false);
  }, [openedCeils, difficulty]);

  const selectHandler = ({ target: { value } }) => {
    setDifficulty(Number(value));
    setGameStatus(false);
  };

  const startHandler = () => {
    if (gameStatus) return false;

    setOpenCeilValues([]);

    const prepared = [];
    colors.sort(() => Math.random() - 0.5);

    for (let i = 1; i <= (difficulty * difficulty) / 2; i++) {
      prepared.push(
        {
          value: i,
          state: 'close',
          bg: colors[i - 1].bg,
          color: colors[i - 1].text,
        },
        {
          value: i,
          state: 'close',
          bg: colors[i - 1].bg,
          color: colors[i - 1].text,
        }
      );
    }
    prepared.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5);
    const preparedCeils = {};
    prepared.forEach((ceil, index) => {
      preparedCeils[index] = ceil;
    });

    setCeils(preparedCeils);
    setTimer(true);
    setGameStatus(true);
  };

  const handleClick = (index) => (e) => {
    if (openCeilValues.length > 1) {
      return false;
    }
    setCeils((prev) => {
      const openCeil = { ...prev[index], state: 'open' };
      return { ...prev, [index]: openCeil };
    });

    setOpenCeilValues((prev) => {
      if (openCeilValues.length < 2) {
        prev.push({ ...ceils[index], index });
        if (openCeilValues.length === 2) {
          checkCeils();
        }
      }
      return prev;
    });
  };

  const checkCeils = () => {
    if (openCeilValues[0].value !== openCeilValues[1].value) {
      setTimeout(() => {
        setCeils((prev) => {
          const first = { ...prev[openCeilValues[0].index], state: 'close' };
          const second = { ...prev[openCeilValues[1].index], state: 'close' };
          return {
            ...prev,
            [openCeilValues[0].index]: first,
            [openCeilValues[1].index]: second,
          };
        });
        setOpenCeilValues([]);
      }, 1000);
    } else {
      setOpenCeilValues([]);
      setOpenedCeil((prev) => prev + 2);
    }
  };

  const showCeils = () => {
    return Object.keys(ceils).map((i) => {
      const ceil = ceils[i];

      return (
        <span
          onClick={ceil.state !== 'open' ? handleClick(i) : () => false}
          style={{
            width: 650 / difficulty,
            height: 650 / difficulty,
            backgroundColor: ceil.bg,
            color: ceil.color,
          }}
          className={`ceil ${ceil.state}`}
          key={i}
        >
          {ceil.value}
        </span>
      );
    });
  };

  return (
    <div className='App'>
      <div className='sidebar'>
        <div className='form-group'>
          <label htmlFor='difficulty'>Choose difficulty</label>
          <select
            {...{ disabled: gameStatus }}
            id='difficulty'
            onClick={selectHandler}
          >
            <option value='4'>Easy</option>
            <option value='6'>Hard</option>
          </select>
        </div>
        <div className='form-group'>
          <button onClick={startHandler}>Start game</button>
        </div>
        <div className='form-group'>
          <Timer run={timer} />
        </div>
      </div>
      <div className='game-wrapper'>
        <div className='field'>{gameStatus && showCeils()}</div>
      </div>
    </div>
  );
}

export default App;
