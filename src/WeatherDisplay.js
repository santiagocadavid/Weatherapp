// src/WeatherDisplay.js
import React, { useState, useEffect, useRef } from 'react';
import { Card,  Row, Col } from 'react-bootstrap';
import "./custom.css";
import clearVideo from './assets/clear-video.mp4';
import fewcloudsVideo from './assets/few clouds-video.mp4';
import scatteredcloudsVideo from './assets/scattered clouds-video.mp4';
import brokencloudsVideo from './assets/broken clouds-video.mp4';
import rainVideo from './assets/rain-video.mp4';
import thunderstormVideo from './assets/thunderstorm-video.mp4';
import snowVideo from './assets/snow-video.mp4';
import mistVideo from './assets/mist-video.mp4';
import thermometerIcon from './assets/thermometer-1829.svg';
import humidityIcon from './assets/humidity-svgrepo-com.svg';
import windIcon from './assets/cooling-symbol-3340.svg';
import weatherIcon from './assets/reshot-icon-weather.svg';



const WeatherDisplay = ({ weather }) => {
  const { main, weather: weatherDetails } = weather;
  const [city, setCity] = useState(""); // State to track the current city
  const videoRef = useRef(null);

    const temperature = (weather.main.temp - 273.1).toFixed(2)

    const getWeatherIcon = (condition) => {
      switch (condition) {
        case 'Clear':
          return '☀️'; // Sun icon

        case 'Clouds':
          return '☁️'; // Cloud icon

        case 'Broken clouds':
        case 'scattered clouds':
        case 'overcast clouds':
          return '☁️'; // Cloud icon

        case 'Rain':
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
        case 'freezing rain':
        case 'light intensity shower rain':
        case 'shower rain':
        case 'heavy intensity shower rain':
        case 'ragged shower rain':
        case 'light intensity drizzle':
        case 'drizzle':
        case 'heavy intensity drizzle':
        case 'light intensity drizzle rain':
        case 'drizzle rain':
        case 'heavy intensity drizzle rain':
        case 'shower rain and drizzle':
        case 'heavy shower rain and drizzle':
        case 'shower drizzle':
          return '🌧️'; // Rain cloud icon

        case 'Thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
          return '⛈️'; // Thunderstorm icon

        case 'Snow':
        case 'light snow':
        case 'snow':
        case 'heavy snow':
        case 'sleet':
        case 'light shower sleet':
        case 'shower sleet':
        case 'light rain and snow':
        case 'rain and snow':
        case 'light shower snow':
        case 'shower snow':
        case 'heavy shower snow':
          return '❄️'; // Snow icon
          

        case 'Mist':
          return '🌫️'; // Mist icon

        default:
          return '❓'; // Question mark for unknown condition
      }
    };



    const getVideoSource = (condition) => {
      if (typeof condition !== 'string') {
        condition = String(condition); // Convert to string if not already
      }
    
      const conditionCode = condition.substring(0, 2); // Extract first two characters

      console.log(conditionCode);
      switch (conditionCode) {
        case '01':
          return clearVideo;
        case '02':
          return fewcloudsVideo;
        case '03':
          return scatteredcloudsVideo;
        case '04':
          return brokencloudsVideo;
        case '10':
          return rainVideo;
        case '11':
          return thunderstormVideo;
        case '13':
          return snowVideo;
        case '50':
          return mistVideo;
        default:
          return "";
      }
    };

    const backgroundStyles = (videoSource) => {
      
      console.log("videoSource: ", videoSource)
      
      if (videoSource) {
        return {
          backgroundImage: `url(${videoSource})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      } else {
        return {};
      }
    };

  return (

      <div>

          <Row>

            <Col md={9} className='main-card'>

                <Card className="border-3 card-hover" style={{ ...backgroundStyles }}>
                <Card.Title className='main-card-city'>{weather.name}, {new Date(weather.dt * 1000).toLocaleDateString()}</Card.Title>

                  <Card.Body>
                    
                    <Row>
                      <Col md={6} >

                        
                        <Card.Text>
                          <img src={thermometerIcon} alt="Temperature" className='weatherIcons'/>
                          <strong>Temperature:</strong> {temperature} °C
                        </Card.Text>
                        <Card.Text>
                          <img src={humidityIcon} alt="Humidity" className='weatherIcons'/>

                          <strong>Humidity:</strong> {weather.main.humidity} %
                        </Card.Text>

                      </Col>
                      <Col md={6} >

                        <Card.Text>
                            <img src={windIcon} alt="Wind" className='weatherIcons'/>

                            <strong>Wind speed:</strong> {weather.wind.speed} m/s
                          </Card.Text>
                        
                          <Card.Text>
                            <img src={weatherIcon} alt="WeatherIcon" className='weatherIcons'/>

                            <strong>Conditions:</strong> {weatherDetails[0].description}
                          </Card.Text>

                        </Col>

                    </Row>

                  </Card.Body>
                </Card>
            </Col>

          </Row>

      </div>

  );
};

export default WeatherDisplay;
