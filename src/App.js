import React from 'react';
import { TrafficLightProvider } from './context/TrafficLightContext';
import TrafficLight from './components/TrafficLight';

function App() {
  return (
    <TrafficLightProvider>
      <TrafficLight />
    </TrafficLightProvider>
  );
}

export default App;
