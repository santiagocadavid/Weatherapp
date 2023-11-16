
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
//import WeatherForm from './WeatherForm'; // Import WeatherForm component
//import VideoPlayer from "react-background-video-player";
//import unknownVideo from './assets/unknown-video.mp4';



const ForecastDisplay = ({ forecast, city }) => {
    
  //const [city, setCity] = useState(""); // State to track the current city
    const forecastForThreeDays = forecast.list.slice(0, 2); // Assuming data is provided in 3-hour intervals
    
    const { list } = forecast;
    const videoRef = useRef(null);

    useEffect(() => {
      const playVideo = async () => {
        // Wait for a short delay to ensure the video has loaded
        await new Promise(resolve => setTimeout(resolve, 500));
  
        // Play the video if the video element is available
        if (videoRef.current) {
          videoRef.current.play().catch(error => console.error('Error playing video:', error));
        }
      };
  
      // When the key changes, reset the video element
      if (videoRef.current) {
        videoRef.current.load();
        playVideo();
      }
    }, [city]); // Include 'city' in the dependency array


    const getWeatherIcon = (condition) => {
      switch (condition) {
        case 'Clear':
          return '☀️'; // Sun icon
        case 'Clouds':
          return '☁️'; // Cloud icon
        case 'Broken clouds':
          return '☁️'; // Cloud icon
        case 'Rain':
          return '🌧️'; // Rain cloud icon
        case 'Thunderstorm':
          return '⛈️'; // Thunderstorm icon
        case 'Snow':
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

    /*
    const handleCityChange = (newCity) => {
      // Update the city state
      setCity(newCity);
    };
    */
  
    const handleSubmit = (e) => {
      // Handle form submission (if needed)
      e.preventDefault();
      // Additional logic based on form submission
    };


    return (
      <div>
      <h2 className='title-forecast'>12-hours Forecast</h2>
      <Row>
        {list.slice(0, 3).map((item) => (
          <Col md={4} key={item.dt}>
            <Card className={`border-2 card-hover`}
              
              style={{ ...backgroundStyles }}

            >
              <video ref={videoRef} key={`${city}-${item.dt}`} autoPlay muted loop style={{ width: '100%', maxHeight: '250px' }} controls="">
                <source src={getVideoSource(item.weather[0].icon)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              

              <Card.Body>
                <Card.Text>
                  <strong>Date:</strong> {new Date(item.dt * 1000).toLocaleDateString()},{' '}
                  {new Date(item.dt_txt).toLocaleTimeString()}
                </Card.Text>
                <Card.Text>
                  <strong>Temperature:</strong> {(item.main.temp - 273.1).toFixed(2)} °C
                </Card.Text>
                <Card.Text>
                  <strong>Humidity:</strong> {item.main.humidity} %
                </Card.Text>
                <Card.Text>
                  <strong>Wind speed:</strong> {item.wind.speed} m/s
                </Card.Text>
                <Card.Text>
                  <strong>Condition:</strong> {item.weather[0].description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    );
  };

export default ForecastDisplay;