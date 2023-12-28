import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import cloudy from '../../images/cloudy.avif';
import foggy from '../../images/foggy.jpeg';
import rainy from '../../images/rainy.avif';
import snowy from '../../images/snowy.jpeg';
import clear from '../../images/clear.jpeg';
import drizzle from '../../images/drizzle.jpeg';
import dusty from '../../images/dusty.webp';
import smoke from '../../images/smoke.jpeg';
import tornado from '../../images/tornado.jpeg';
import defaultImage from '../../images/default.avif';
 
const getImage={
    "Clouds": cloudy,
    "Fog": foggy,
    "Rain": rainy,
    "Snow": snowy,
    "Haze": clear,
    "Clear": clear,
    "Dust" : dusty,
    "Drizzle": drizzle,
    "Smoke": smoke,
    "Tornado": tornado
}

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherDetails, setWeatherDetails] = useState({});
  const [lastSearched, setLastSearched] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedWeatherDetails = JSON.parse(localStorage.getItem('weatherDetails'));

    if (storedWeatherDetails) {
      setWeatherDetails(storedWeatherDetails);
    }
  }, []);

  useEffect(() => {
    const storedLastSearched = localStorage.getItem('lastSearched');

    if (storedLastSearched) {
      setLastSearched(storedLastSearched);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherDetails', JSON.stringify(weatherDetails));
  }, [weatherDetails]);

  const { weather = [], name = '' } = weatherDetails;

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&APPID=08502e23209a6b1cb177bf1d54f06cc4`;

  const handleButtonClick = async () => {
    try{
      setLoading(true);
      const response = await fetch(URL);
      if (!response.ok) {
        // If the response status is not okay (e.g., 404 Not Found), throw an error
        throw new Error(`Weather data not found for ${searchQuery}`);
      }
      const data = await response.json();
      setWeatherDetails(data);

      localStorage.setItem('lastSearched', searchQuery);
      setLastSearched(searchQuery);
    }catch(error){
      console.log(error.message);
      window.alert(error.message);
    }finally{
      setLoading(false)
    }
    }
    

  return (
    <div className={styles.SearchBarWrapper}>
      <div className={styles.SearchContainer}>
        <input
          className={styles.SearchInput}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.SearchButton} onClick={handleButtonClick}>
          Search
        </button>
      </div>
      {loading && <div className={styles.loader}>Loading...</div>}
      {weatherDetails && (
        <div className={styles.WeatherDetails}>
          <div>The weather in {name} is {weather[0]?.main}</div>
          <div>Description: {weather[0]?.description}</div>
          <div>The temperature is {weatherDetails.main?.temp} while the humidity is {weatherDetails.main?.humidity}</div>
          {lastSearched && <div>Last searched: {lastSearched}</div>}
          <img className={styles.background_image} src={getImage[weather[0]?.main] || defaultImage} alt='no img'/>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
