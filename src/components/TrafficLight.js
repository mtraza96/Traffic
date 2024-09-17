import React, { useEffect, useState } from 'react';
import { useTrafficLight } from '../context/TrafficLightContext';
//import PedestrianButton from './PedestrianButton';
import './TrafficLight.css';

const TrafficLight = () => {
  const { state, dispatch } = useTrafficLight();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Initialize timer based on the current light state
    const initializeTimer = () => {
      switch (state.currentLight) {
        case 'GREEN':
          setTimer(10); // Green light duration
          break;
        case 'YELLOW':
          setTimer(3); // Yellow light duration
          break;
        case 'RED':
          setTimer(7); // Red light duration
          break;
        default:
          setTimer(0);
      }
    };

    initializeTimer(); // Set the initial timer value

    // Update timer every second
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Handle light transitions
    let lightChangeTimeout;
    if (state.currentLight === 'GREEN') {
      lightChangeTimeout = setTimeout(() => {
        if (state.pedestrianRequest) {
          dispatch({ type: 'CHANGE_LIGHT', payload: 'GREEN' });
        } else {
          dispatch({ type: 'CHANGE_LIGHT', payload: 'YELLOW' });
        }
      }, 10000); // Green light duration
    } else if (state.currentLight === 'YELLOW') {
      lightChangeTimeout = setTimeout(() => {
        dispatch({ type: 'CHANGE_LIGHT', payload: 'RED' });
      }, 3000); // Yellow light duration
    } else if (state.currentLight === 'RED') {
      lightChangeTimeout = setTimeout(() => {
        if (state.pedestrianRequest) {
          dispatch({ type: 'CHANGE_LIGHT', payload: 'RED' });
        } else {
          dispatch({ type: 'CHANGE_LIGHT', payload: 'GREEN' });
        }
      }, 7000); // Red light duration
    }

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(interval);
      clearTimeout(lightChangeTimeout);
    };
  }, [state.currentLight, state.pedestrianRequest, dispatch]);

  const handlePedestrianButtonClick = () => {
    dispatch({ type: 'REQUEST_CROSSING' });
  };

  return (
    <div className="traffic-light-container">
      <div className="timer-box" style={{ color: 'red' }}>
        {timer} {/* Display countdown without "s" */}
      </div>

      <div className="traffic-light">
        <div className={`light red ${state.currentLight === 'RED' ? 'active' : ''}`} />
        <div className={`light yellow ${state.currentLight === 'YELLOW' ? 'active' : ''}`} />
        <div className={`light green ${state.currentLight === 'GREEN' ? 'active' : ''}`} />
      </div>

      <div className="pole-base">
        <button onClick={handlePedestrianButtonClick} className="pedestrian-button">
          Request Crossing
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;
