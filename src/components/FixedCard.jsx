import React from 'react';
import "./FixedCard.css";
import Loading from './Loading';


const FixedCard = ({data, temp, isLoading}) => {
  const mainWeather = data?.weather[0]?.main;
  const farenheitTemp = (data?.main.temp - 273.15) * 1.8 + 32;
  const celsius = data?.main.temp - 273.15;
  const feelsLikeFarenheit = (data?.main.feels_like - 273.15) * 1.8 + 32;
  const feelsLikeCelsius = data?.main.feels_like - 273.15;
  const humidity = data?.main.humidity;
  const mainCode = data?.weather[0].icon;


  const weatherCodes = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"];

  const shortCut = "../../images/";

  const weatherImages = [`${shortCut}clearDay.png`, `${shortCut}clearNight.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}clouds.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}rain.png`, `${shortCut}thunderStorm.png`, `${shortCut}thunderStorm.png`, `${shortCut}snow.png`, `${shortCut}snow.png`, `${shortCut}hazeDay.png`, `${shortCut}hazeNight.png`];

  
  function renderProperWeatherImage(mainCode, weatherCodes, weatherImages){
    for(let i = 0; i < weatherCodes.length; i++){
      if(mainCode === weatherCodes[i]){
        return weatherImages[i];
      }
    }
  }


  return (
    <div className='card'>
      {
        isLoading ? 
        
        <Loading />

        :

        <>
        
          <div className='upper-box'>
            <img src={renderProperWeatherImage(mainCode, weatherCodes, weatherImages)} alt="clear" />

            <div className='location-box'>
              <h2>{data?.name} - {data?.sys.country}</h2>
              <p>{temp ? farenheitTemp.toFixed(2) : celsius.toFixed(2) } {temp ? "°F" : "°C"}</p>
            </div>

          </div>
        
          <div className="bottom-box">
           <div className='weather-box'>
             <p>{mainWeather}</p>
             <h5>Weather</h5>
            </div>

            <div className='description-box'>
             <p>{data?.weather[0].description}</p>
             <h5>Description</h5>
            </div>

            <div className='feels-box'>
              <p>{temp ? feelsLikeFarenheit.toFixed(2) : feelsLikeCelsius.toFixed(2)} {temp ? "°F" : "°C"}</p>
              <h5>Feels Like</h5>
            </div>


            <div className='humidity-box'>
              <p>{humidity}%</p>
             <h5>Humidity</h5>
            </div>
        </div>
        </>
       
      }
    </div>
  )
}




export default FixedCard