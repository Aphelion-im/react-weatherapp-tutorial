// H6.4: https://edhub.novi.nl/study/courses/516/content/12755 (Data fetchen)
// Deze App maakt gebruik van de volgende pagina's:
// Components: SearchBar, TabBarMenu, WeatherDetail, MetricSlider
// Pages: ForecastTab, TodayTab

import './App.css';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import { useState } from 'react';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState({});

  async function fetchData() {
    try {
      const result = await axios.get(
        `${BASE_URL}?q=utrecht,nl&appid=${PUBLIC_KEY}&lang=nl`
      );
      console.log(result.data);
      setWeatherData(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="weather-container">
        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar />

          <span className="location-details">
            {/* Object.keys:  */}
            {/* Maar omdat wij weatherData initialiseren als leeg object (const [weatherData, setWeatherData] = useState({});), zal dit in bovenstaande check evalueren naar truthy en krijgen we alsnog een foutmelding. Wanneer we structurele datatypes gebruiken (zoals objecten en arrays) zullen we moeten checken of er wel keys of waardes in staan, voor we elementen renderen */}
            {Object.keys(weatherData).length > 0 && (
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{weatherData.main.temp}</h1>
              </>
            )}

            <button onClick={fetchData} type="button">
              Haal data op!
            </button>
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu />

          <div className="tab-wrapper">
            Alle inhoud van de tabbladen komt hier!
          </div>
        </div>

        <MetricSlider />
      </div>
    </>
  );
}
