// H6.4: https://edhub.novi.nl/study/courses/516/content/12755 (Data fetchen)
// Deze App maakt gebruik van de volgende pagina's:
// Components: SearchBar, TabBarMenu, WeatherDetail, MetricSlider
// Pages: App.jsx, ForecastTab, TodayTab, WeatherDetails
// Er worden 3 aparte Axios get request verzonden op 3 pagina's: App.jsx, TodayTab.jsx en ForecastTab.jsx
// Eindoproject aspecten: helper functies, tabbladen, user feedback (Conditioneel), loader, use Context
// React router dom Switch is React router dom versie 5. <Routes> is versie 6. https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom
// In sommige bestanden om en om Celcius of Celsius geschreven. Niet consistent.

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TempContext } from './context/TempContextProvider';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import './App.css';
import TodayTab from './pages/todayTab/TodayTab';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      toggleLoading(true);

      try {
        const result = await axios.get(
          `${BASE_URL}weather?q=${location},nl&appid=${PUBLIC_KEY}&lang=nl`
        );
        setWeatherData(result.data);
      } catch (e) {
        console.error(e);
        setError(true);
      }

      toggleLoading(false);
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
            {loading && <span>Loading...</span>}

            {weatherData && (
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
              </>
            )}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <Router>
          <div className="weather-content">
            <TabBarMenu />

            <div className="tab-wrapper">

              {/* Nova gebruikt <Switch>. Switch is React router dom */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <TodayTab coordinates={weatherData && weatherData.coord} />
                  }
                ></Route>
                <Route
                  path="/komende-week"
                  element={
                    <ForecastTab
                      coordinates={weatherData && weatherData.coord}
                    />
                  }
                ></Route>
              </Routes>
            </div>
          </div>
        </Router>

        <MetricSlider />
      </div>
    </>
  );
}

export default App;
