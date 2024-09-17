// TrafficLightContext.js
import React, { createContext, useContext, useReducer } from 'react';

const TrafficLightContext = createContext();

const initialState = {
  currentLight: 'GREEN', // 'GREEN', 'YELLOW', 'RED'
  pedestrianRequest: false,
  countdown: 10,
};

const actionTypes = {
  CHANGE_LIGHT: 'CHANGE_LIGHT',
  REQUEST_CROSSING: 'REQUEST_CROSSING',
  RESET_TIMER: 'RESET_TIMER',
  EMERGENCY_OVERRIDE: 'EMERGENCY_OVERRIDE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LIGHT:
      return { ...state, currentLight: action.payload };
    case actionTypes.REQUEST_CROSSING:
      return { ...state, pedestrianRequest: true };
    case actionTypes.RESET_TIMER:
      return { ...state, countdown: action.payload };
    case actionTypes.EMERGENCY_OVERRIDE:
      return { ...state, currentLight: 'RED', countdown: 0 };
    default:
      return state;
  }
};

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export const useTrafficLight = () => useContext(TrafficLightContext);
