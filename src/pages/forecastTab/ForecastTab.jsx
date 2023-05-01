import axios from 'axios';
import { useState, useEffect } from 'react';
import './ForecastTab.css';

// Variables
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;

function createDateString(timestamp) {
  const day = new Date(timestamp * 1000);
  return day.toLocaleDateString('nl-NL', { weekday: 'long' });
}

function ForecastTab({ coordinates }) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    async function fetchForecasts() {
      try {
        const response = await axios.get(
          `${BASE_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${PUBLIC_KEY}&lang=nl`
        );
        console.log(response.data);

        const fiveDayForecast = response.data.list.filter((singleForecast) => {
          return singleForecast.dt_txt.includes('12:00:00');
        });

        setForecasts(fiveDayForecast);
      } catch (e) {
        console.error(e);
      }
    }

    if (coordinates) {
      fetchForecasts();
    }
  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {forecasts.map((singleForecast) => {
        return (
          <article className="forecast-day" key={singleForecast.dt}>
            <p className="day-description">
              {createDateString(singleForecast.dt)}
            </p>

            <section className="forecast-weather">
              <span>{singleForecast.main.temp}&deg; C</span>
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
