import { useEffect, useState } from "react";
import wind from "./assets/wind.svg";
import humidity from "./assets/humidity.svg";
import uv from "./assets/uv.svg";
import visible from "./assets/visible.svg";
import pressure from "./assets/pressure.svg";
import feels from "./assets/feels.svg";

const API_KEY = "25af677950fb4f1a7efe69621cfd2ba2"; // Replace with your OpenWeatherMap API key

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const inputElement = document.querySelector("input");
    const sendButton = document.querySelector("#send");

    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&units=metric&appid=${API_KEY}`
        );

        if (response.ok) {
          let data = await response.json();
          setWeatherData(data);
        } else {
          console.error("Error fetching weather data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    sendButton.onclick = function () {
      fetchData();
      inputElement.value = "";
    };
  }, []);

  if (!weatherData) {
    return <div>Please enter your city below</div>;
  }

  return (
    <div className="mainData">
      <div className="mainData-section">
        <h2>{weatherData.name}</h2>
        <div className="mainData-Weather-Details">
          <img
            className="condition-icon"
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <div className="temp-Details">
            <p className="temperature">{weatherData.main.temp}°C</p>
            <p className="condition">{weatherData.weather[0].description}</p>
          </div>
        </div>
      </div>
      <div className="wind">
        <img src={feels} alt="Feels like icon" />
        <h2 className="wind-heading">Feels like</h2>
        <p>{weatherData.main.feels_like}°C</p>
      </div>
      <div className="wind">
        <img src={wind} alt="Wind icon" />
        <h2 className="wind-heading">Wind</h2>
        <p>{weatherData.wind.speed} km/h</p>
      </div>
      <div className="wind">
        <img src={humidity} alt="Humidity icon" />
        <h2 className="wind-heading">Humidity</h2>
        <p>{weatherData.main.humidity}%</p>
      </div>
      <div className="wind">
        <img src={uv} alt="UV icon" />
        <h2 className="wind-heading">UV</h2>
        <p>{weatherData.main.uvi}</p>
      </div>
      <div className="wind">
        <img src={visible} alt="Visibility icon" />
        <h2 className="wind-heading">Visibility</h2>
        <p>{weatherData.visibility / 1000} km</p>
      </div>
      <div className="wind">
        <img src={pressure} alt="Air Pressure icon" />
        <h2 className="wind-heading">Air pressure</h2>
        <p>{weatherData.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherComponent;
