// H6.4: https://edhub.novi.nl/study/courses/516/content/12755 (Data fetchen)
// Deze App maakt gebruik van de volgende pagina's:
// Components: SearchBar, TabBarMenu, WeatherDetail, MetricSlider
// Pages: App.jsx, ForecastTab, TodayTab
// @H7.7

import './App.css';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import { useState, useEffect } from 'react';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}weather?q=${location},nl&appid=${PUBLIC_KEY}&lang=nl`
        );
        console.log(response.data);
        setWeatherData(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    // React H7.5: We roepen de functie aan als location is veranderd, maar niet als het een null/undefined/lege string is
    // Alleen fetchForecasts aanroepen als er daadwerkelijk coordinaten beschikbaar zijn, ivm asynchroon
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

          <span className="location-details">
            {Object.keys(weatherData).length > 0 && (
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{weatherData.main.temp}</h1>
              </>
            )}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu />

          <div className="tab-wrapper">
            <ForecastTab coordinates={weatherData.coord} />
          </div>
        </div>

        <MetricSlider />
      </div>
    </>
  );
}
