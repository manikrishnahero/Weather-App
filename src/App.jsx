import { useEffect, useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";
import { TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti";
import { FaCloudSunRain } from "react-icons/fa";
import { BiWind } from "react-icons/bi";
import { LuGauge } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";

function App() {
  const [search, setSearch] = useState();
  const [city, setCity] = useState(null);

  const getWeather = async () => {
    if (search.trim() == "") {
      return alert("Enter Correct city Name");
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=95fb6ae84c581bfc181cdfd279538a53`,
      );

      const result = await response.json();

      if (result.cod === 200) {
        setCity(result);
      } else {
        alert(result.message);
        setCity(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  console.log(city);

  return (
    <div className="container">
      <h4 className="logo">
        <TiWeatherPartlySunny /> Weather's Today
      </h4>
      <h1 className="heading">What's the weather like today?</h1>

      {/* Search */}
      <section className="search-section">
        <div className="input-box">
          <IoSearch className="search-icon" />

          <input
            type="text"
            placeholder="Enter the city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />
        </div>

        <button onClick={getWeather}>Search</button>
      </section>

      {/* Weather */}
      {city && (
        <div className="weather-appearance">
          <div className="weather-section">
            <section>
              <h1>
                {city.name}, {city.sys.country}
              </h1>

              <h4>{city.weather[0].description}</h4>
            </section>

            <section>
              <h1 className="weather">
                <FaCloudSunRain className="mainImage" />
                {Math.round(city.main.temp)}°C
              </h1>
            </section>
          </div>

          {/* events */}
          <div className="events">
            <div className="card">
              <BsMoisture size={25} color="#ffff" />
              <h3>Humidity</h3>
              <p>{city.main.humidity}%</p>
            </div>

            <div className="card">
              <BiWind size={25} color="#ffff" />
              <h3>Wind Speed</h3>
              <p>{city.wind.speed} m/s</p>
            </div>

            <div className="card">
              <LuGauge size={25} color="#ffff" />
              <h3>Pressure</h3>
              <p>{city.main.pressure} hPa</p>
            </div>

            <div className="card">
              <TiWeatherSunny size={25} color="#ffff" />
              <h3>Feels Like</h3>
              <p>{Math.round(city.main.feels_like)}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
