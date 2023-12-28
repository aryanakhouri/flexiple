function useWeatherApi({
    setLoading=()=>{},
    setWeatherDetails=()=>{},
    searchQuery='',
    setLastSearched=()=>{},
}){

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
          // updateSearchHistory(searchQuery);
          setLastSearched(searchQuery);
        }catch(error){
          console.log(error.message);
          window.alert(error.message);
        }finally{
          setLoading(false)
        }
        }
      
    
      const handleEnterKeyPress = (e)=>{
        if(e.key === 'Enter'){
          handleButtonClick();
        }
      }

      return {handleButtonClick, handleEnterKeyPress};

}
export default useWeatherApi;