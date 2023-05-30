// React H7.7 - https://edhub.novi.nl/study/courses/516/content/12762
// https://www.epochconverter.com - Epoch & Unix Timestamp Conversion Tools
// Om de juiste dag weer te geven hebben we de property dt nodig. Die staat voor Date Time.
// Echter, als je de documentatie van deze API zou lezen, zou je erachter komen dat deze waarde als UNIX timestamp (aantal seconden sinds 1970) wordt meegegeven.
// One Call API 2.5: https://openweathermap.org/api/one-call-api
// One Call API 2.5 niet langer ondersteund

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TempContext } from '../../context/TempContextProvider';
import createDateString from '../../helpers/createDateString';
import './ForecastTab.css';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

function ForecastTab({ coordinates }) {
  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      toggleLoading(true);

      // Sam: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&exclude=minutely,current,hourly&appid={apiKey}&lang=nl
      // Oude url: https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${PUBLIC_KEY}&lang=nl
      try {
        const result = await axios.get(
          `${BASE_URL}forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${PUBLIC_KEY}&lang=nl`
        );
        setForecasts(result.data.daily.slice(1, 6));
        toggleLoading(false);
      } catch (e) {
        console.error(e);
        setError(true);
        toggleLoading(false);
      }
    }

    if (coordinates) {
      fetchData();
    }
  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {forecasts &&
        forecasts.map((forecast) => {
          return (
            <article className="forecast-day" key={forecast.dt}>
              <p className="day-description">{createDateString(forecast.dt)}</p>
              <section className="forecast-weather">
                <span>{kelvinToMetric(forecast.temp.day)}</span>
                <span className="weather-description">
                  {forecast.weather[0].description}
                </span>
              </section>
            </article>
          );
        })}

      {!forecasts && !error && (
        <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
      )}

      {error && <span>Er is iets misgegaan met het ophalen van de data.</span>}

      {loading && <span>Loading...</span>}
    </div>
  );
}

export default ForecastTab;
