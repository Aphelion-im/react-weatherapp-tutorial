// React H7.7 - https://edhub.novi.nl/study/courses/516/content/12762
// https://www.epochconverter.com - Epoch & Unix Timestamp Conversion Tools
// Om de juiste dag weer te geven hebben we de property dt nodig. Die staat voor Date Time.
// Echter, als je de documentatie van deze API zou lezen, zou je erachter komen dat deze waarde als UNIX timestamp (aantal seconden sinds 1970) wordt meegegeven.
// Mogelijk een fout in H8.1: Er wordt geen foutmelding weergegeven in het onderste stuk

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import kelvinToCelsius from '../../helpers/kelvinToCelsius';
import createDateString from '../../helpers/createDateString';
import './ForecastTab.css';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

function ForecastTab({ coordinates }) {
  const [forecasts, setForecasts] = useState([]);
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    async function fetchForecasts() {
      toggleLoading(true);
      try {
        toggleError(false);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${PUBLIC_KEY}&lang=nl`
        );
        console.log(response.data);

        const fiveDayForecast = response.data.list.filter((singleForecast) => {
          return singleForecast.dt_txt.includes('12:00:00');
        });

        setForecasts(fiveDayForecast);
      } catch (e) {
        console.error(e);
        toggleError(true);
      }
      toggleLoading(false);
    }

    if (coordinates) {
      fetchForecasts();
    }
  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
      {forecasts.length === 0 && !error && (
        <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
      )}
      {loading && <span>Loading...</span>}
      {forecasts.map((singleForecast) => {
        return (
          <article className="forecast-day" key={singleForecast.dt}>
            <p className="day-description">
              {createDateString(singleForecast.dt)}
            </p>

            <section className="forecast-weather">
              <span>{kelvinToCelsius(singleForecast.main.temp)}</span>
              <span className="weather-description">
                {singleForecast.weather[0].description}
              </span>
            </section>
          </article>
        );
      })}
    </div>
  );
}

export default ForecastTab;
