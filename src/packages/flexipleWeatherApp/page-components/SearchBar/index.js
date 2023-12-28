import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import defaultImage from '../../images/default.avif';
import useWeatherApi from '../../hooks/useWeatherApi';
import getImage from '../../constants';
 
function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherDetails, setWeatherDetails] = useState({});
  const [lastSearched, setLastSearched] = useState('');
  const [loading, setLoading] = useState(false);
  // const [searchHistory, setSearchHistory] = useState([]);
  // const [suggestions, setSuggestions] = useState(false);

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

  // useEffect(() => {
  //   const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  //   setSearchHistory(storedSearchHistory);
  // }, []);

  const { weather = [], name = '' } = weatherDetails;

  // const updateSearchHistory = (query) => {
  //   const updatedHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 5);
  //   setSearchHistory(updatedHistory);
  //   localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  // };

  const 
  { handleButtonClick = ()=>{}, handleEnterKeyPress=()=>{}} 
  = useWeatherApi({
    setLoading: setLoading,
    setWeatherDetails: setWeatherDetails,
    searchQuery: searchQuery,
    setLastSearched: setLastSearched
  })

  

  // const handleSuggestionClick = (suggestion) => {
  //   setSearchQuery(suggestion);
  //   handleButtonClick();
  // };
    

  return (
    <div className={styles.SearchBarWrapper}>
      <div className={styles.SearchContainer}>
        <div>
        <input
          className={styles.SearchInput}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // setSuggestions(true)
          }}
          onKeyDown={handleEnterKeyPress}
        />
        {/* {searchHistory.length > 0 && suggestions && searchQuery && (
        <div className={styles.SearchHistory}>  
            {searchHistory.map((suggestion, index) => (
              <div key={index} onClick={() => handleSuggestionClick(suggestion)} className={styles.suggestion}>
                {suggestion}
              </div>
            ))}
        </div>
      )} */}
      </div>
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
