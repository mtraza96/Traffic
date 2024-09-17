import React from 'react';
import './TrafficLight.css'; // Assume you have some CSS to handle the light colors and transitions

const YellowLight = ({ isActive }) => (
  <div className={`light yellow ${isActive ? 'active' : ''}`} />
);

export default YellowLight;
