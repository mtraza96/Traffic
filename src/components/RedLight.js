import React from 'react';
import './TrafficLight.css'; // Assume you have some CSS to handle the light colors and transitions

const RedLight = ({ isActive }) => (
  <div className={`light red ${isActive ? 'active' : ''}`} />
);

export default RedLight;
