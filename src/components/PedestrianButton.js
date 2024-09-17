import React from 'react';
import { useTrafficLight } from '../context/TrafficLightContext';
import './TrafficLight.css';

const PedestrianButton = () => {
  const { dispatch } = useTrafficLight();

  const handleClick = () => {
    dispatch({ type: 'REQUEST_CROSSING' });
  };

  return (
    <button onClick={handleClick} className="pedestrian-button">
      Request Crossing
    </button>
  );
};

export default PedestrianButton;
