// src/WeatherForm.js
import React, { useState } from 'react';
import "./custom.css";
import ForecastDisplay from './ForecastDisplay';


const WeatherForm = ({ onSubmit, onChangeCity }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
    
    setCity('');
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleCityChange = (newCity) => {
    setCity(newCity);
    onChangeCity(newCity);
  };

  return (
    <div className="center-container">
        <form onSubmit={handleSubmit} className="p-4 form-city" >
          <label className="mb-2">
            
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="form-control"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Get Weather
          </button>
        </form>

          <button
            className="btn btn-secondary"
            onClick={() => refreshPage()} // Change "NewCity" to the desired city
            >
            Change City
          
          </button>

        {weatherData && <ForecastDisplay forecast={weatherData} />}
      </div>
  );
};

export default WeatherForm;
