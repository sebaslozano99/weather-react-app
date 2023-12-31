import React from 'react';
// import "./FixedCard.css";
import Loading from './Loading/Loading';




// backgroundColor: rgba(0,0,0, 0.5)




  const upperBox = {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    // alignItems: "start",
    height: "40%",
    // border: "1px solid red",
  }


  const locationBox = {
     width: "70%",
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "space-evenly",
    //  border: "1px solid white",
  }


  const bottomBox = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  }

  const imageStyle = {
    width: "auto",
    height: "90%",
    // border: "1px solid purple",

  }

const ReUsableCard = ({data, temp, isLoading, theme, title2Size = "3em", locaPsize = "4em", bottomH5Size = "1.5em", bottomPSize = "1.2em"}) => {
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





  // STYLES

  const card = {
    boxShadow: "1px 1px 5px #000",
    backgroundColor: theme ? "rgba(0, 0, 0, 0.7)" :  "rgba(255, 255, 255, 0.1)",
    width: "auto",
    height: "100%",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2em",
    padding: "0.5em",
    // border: "2px solid red"
  }

  const locationBoxH2 = {
    fontSize: title2Size,
    fontWeight: "100",
    // transition: "all easa-in-out .3s",
    color: theme ? "#fff" : "#000",
  }


  const locationBoxP = {
    fontSize: locaPsize,
    fontWeight: "700",
    color: theme ? "#fff" : "#000",
  }


  const bottomBoxH5 = {
    fontSize: bottomH5Size,
    textAlign: "center",
    fontWeight: "600",
    color: theme ? "#fff" : "#000",
  }


  const bottomBoxP = {
    fontSize: bottomPSize,
    textAlign: "center",
    fontWeight: "300",
    color: theme ? "#fff" : "#000",
  }

  return (
    <div style={card}>
      {
        isLoading ? 
        
        <Loading />

        :

        <>
        
          <div style={upperBox}>
            <img src={renderProperWeatherImage(mainCode, weatherCodes, weatherImages)} alt="clear" style={imageStyle} />

            <div style={locationBox}>
              <h2 style={locationBoxH2}>{data?.name} - {data?.sys.country}</h2>
              <p style={locationBoxP}>{temp ? farenheitTemp.toFixed(2) : celsius.toFixed(2) } {temp ? "°F" : "°C"}</p>
            </div>

          </div>
        
          <div style={bottomBox}>

           <div>
             <p style={bottomBoxP}>{mainWeather}</p>
             <h5 style={bottomBoxH5}>Weather</h5>
            </div>

            <div>
             <p style={bottomBoxP}>{data?.weather[0].description}</p>
             <h5 style={bottomBoxH5}>Description</h5>
            </div>

            <div>
              <p style={bottomBoxP}>{temp ? feelsLikeFarenheit.toFixed(2) : feelsLikeCelsius.toFixed(2)} {temp ? "°F" : "°C"}</p>
              <h5 style={bottomBoxH5}>Feels Like</h5>
            </div>


            <div>
              <p style={bottomBoxP}>{humidity}%</p>
             <h5 style={bottomBoxH5}>Humidity</h5>
            </div>

          </div>
        </>
       
      }
    </div>
  )
}




export default ReUsableCard