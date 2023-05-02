// H6.4: https://edhub.novi.nl/study/courses/516/content/12755 (Data fetchen)
// Deze App maakt gebruik van de volgende pagina's:
// Components: SearchBar, TabBarMenu, WeatherDetail, MetricSlider
// Pages: App.jsx, ForecastTab, TodayTab, WeatherDetails
// Er worden 3 aparte Axios get request verzonden op 3 pagina's: App.jsx, TodayTab.jsx en ForecastTab.jsx
// Eindoproject aspecten: helper functies, tabbladen, user feedback (Conditioneel), loader


import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import TodayTab from './pages/todayTab/TodayTab';
import kelvinToCelsius from './helpers/kelvinToCelsius';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');
  const [error, toggleError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleError(false);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${PUBLIC_KEY}&lang=nl`
        );
        console.log(response.data);
        setWeatherData(response.data);
      } catch (e) {
        console.error(e);
        toggleError(true);
      }
    }

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <>
      <div className="weather-container">
        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation} />
          {error && (
            <span className="wrong-location-error">
              Oeps! Deze locatie bestaat niet
            </span>
          )}

          <span className="location-details">
            {Object.keys(weatherData).length > 0 && (
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
              </>
            )}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu />

          <div className="tab-wrapper">
            <Routes>
              <Route
                path="/"
                element={<TodayTab coordinates={weatherData.coord} />}
              />
              <Route
                path="/komende-week"
                element={<ForecastTab coordinates={weatherData.coord} />}
              />
            </Routes>
          </div>
        </div>

        <MetricSlider />
      </div>
    </>
  );
}

export default App;
