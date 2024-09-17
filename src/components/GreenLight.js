import React from 'react';
import './TrafficLight.css'; // Assume you have some CSS to handle the light colors and transitions

const GreenLight = ({ isActive }) => (
  <div className={`light green ${isActive ? 'active' : ''}`} />
);

export default GreenLight;
