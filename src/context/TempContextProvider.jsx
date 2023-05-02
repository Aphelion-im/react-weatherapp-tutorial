import React, { createContext, useState } from 'react';
import kelvinToCelsius from '../helpers/kelvinToCelsius';
import kelvinToFahrenheit from '../helpers/kelvinToFahrenheit';

export const TempContext = createContext(null);

function TempContextProvider({ children }) {
  const [selectedMetric, toggleSelectedMetric] = useState('celsius');

  function toggleTemp() {
    if (selectedMetric === 'celsius') {
      toggleSelectedMetric('fahrenheit');
    } else {
      toggleSelectedMetric('celsius');
    }
  }

  return (
    <TempContext.Provider value={{
      toggleTemp: toggleTemp,
      kelvinToMetric: selectedMetric === 'celsius' ? kelvinToCelsius : kelvinToFahrenheit,
    }}>
      { children }
    </TempContext.Provider>
  )
}

export default TempContextProvider;
