// src/App.js
import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import "./custom.css";
import image from './assets/img3.jpg';
import Spinner from './Spinner'; // Import the Spinner component
import Footer from './Footer';
import { Card,  Row, Col, Modal } from 'react-bootstrap';



const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(""); // State to track the current city
  const [loading, setLoading] = useState(false);
  
  const [updateKey, setUpdateKey] = useState(0);
  const backgroundStyles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    
  };

  const getWeather = async (city) => {
    try {
      console.log('Setting loading to true');
      setLoading(true);
      //Fetch data
      const response = await fetch(`https://backend-weatherapp-scn.onrender.com/api/weather?city=${city}`);
      const weatherData = await response.json();
      setWeather(weatherData);

      // Fetch forecast data
      const forecastResponse = await fetch(`https://backend-weatherapp-scn.onrender.com/api/forecast?city=${city}`);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);

      //setUpdateKey(prevKey => prevKey + 1);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }

  };

  const handleChangeCity = (newCity) => {
    setCity(newCity);
    
  };



  return (
    <div>

      <div className='container'
      style= {backgroundStyles}
      
      >
          <h1 className='general-title'>Weather App</h1>
          <h2 className='title-enter'>Please enter a city</h2>
          <WeatherForm  onSubmit={getWeather} onChangeCity={handleChangeCity} />

          {loading ? (

          <div className="text-center">
            <Spinner animation="border" role="status" className="mr-2" />
            <span className="loading-message">Loading, please wait...</span>
          </div>

        ) : (
          <>
            {weather && <WeatherDisplay weather={weather} />}
            {forecast && <ForecastDisplay forecast={forecast} city={city} />}
          </>
        )}

      </div>

      
      <Footer />

    </div>

  );
};

export default App;
