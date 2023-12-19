import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Container from "./components/Container";
import ReUsableCard from "./components/ReUsableCard";
import NoInternet from "./components/NoInternet";
import "./App.css";
import {Routes, Route} from "react-router-dom";



function App() {
  const [weatherFourCities, setWeatherFourCities] = useState([]); //We'll fetch four random cities, from "cities" state below
  const [weatherData, setWeatherData] = useState(null); //state to store the data gotten by fetching the data
  const [searchQuery, setSearchQuery] = useState("barranquilla");
  const [cities, setCities] = useState(["new york", "jerusalem", "moscow", "tokio", "berlin", "rome", "paris"]); //initial data to display four cities apart from bigger card city
  const [temp, setTemp] = useState(false); //state to display data in "Celsius" if false or in "Farenheit" if true;
  const [isLoading, setIsLoading] = useState(false); //isLoading state for bigger and independent card
  const [isLoadingFourCities, setIsLoadingFourCities] = useState(false);  //isLoading state for smaller cards
  const [themeMode, setThemeMode] = useState(false);
  const [error, setError] = useState("");

  // console.log(selected)
  
 
  //use effect for the place's weather's data on the right
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchCitiesData(){
      for(let i = 0; i < cities.length; i++){ //while i < 4, cause we'll display only 4 extra cities apart from the big card city
        // const randomId = Math.round(Math.random() * cities.length);
        try{
          setIsLoadingFourCities(true);                                                      
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=777755690ecb518be7c3410d5ae34b00` , {signal: controller.signal});
          // console.log(res);
          // if(!res.ok) throw new Error("Something went wrong!");
  
          const data = await res.json();

          // for(let i = 0; i < weatherFourCities.length; i++){
          //   if(weatherFourCities[i].name === data.name) return;
          // }
          

          if(data.cod === "404"){
            alert("City not found!");
            return;
          }
  
          console.log(data); 
          setWeatherFourCities( (weatherFourCities) => [...weatherFourCities , data]);
          // setWeatherFourCities(weatherFourCities.length <= 4 ? (weatherFourCities) => [...weatherFourCities , data] : [...weatherFourCities, data]);
          setIsLoadingFourCities(false);
        }
        catch(error){
            console.log(error);
            setError(error.message);
        }
        finally{
          setIsLoadingFourCities(false);
        }
      }
    }

    fetchCitiesData();

    return function(){
      controller.abort();
    }
  
  }, [cities])




  //useEffect for weather information of the bigger card
  useEffect(() => {

    async function fetchingData(){
      if(searchQuery.length <= 3) return;
      try{
        setError("");
        setIsLoading(true);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=777755690ecb518be7c3410d5ae34b00`);
        console.log(res);

        // if(res.status === 404) {
        //   throw new Error("Failed to fetch");
        // };

        const data = await res.json();
        console.log(data);


        if(data.message === "city not found"){
          alert("City not found!");
          throw new Error(data.message);
        }

        setIsLoading(false);
        setWeatherData(data);
      }
      catch(error){
        console.log(error);
        setError(error.message);

      }
      finally{
        setIsLoading(false);
      }

    }

    fetchingData();


  }, [searchQuery])



  function handleSearch(query){
    setSearchQuery(query);
  }


  // change temperature from "celcius" to "farenheit"
  function changeTemp(){
    setTemp(!temp);
  }


  function changeThemeMode(){
    setThemeMode(!themeMode);
  }



  return (
    <div className={themeMode? "App darkMode" : "App"}>
       <Nav temp={temp} onChangeTemp={changeTemp}  onSearch={handleSearch}  theme={themeMode} onChangeTheme={changeThemeMode} />

        <Routes>
          <Route path="/" element={
            error === "Failed to fetch" ? 
            <NoInternet theme={themeMode} /> 
            :
            <Container fourCities={weatherFourCities} temp={temp} isLoading={isLoadingFourCities} theme={themeMode}>
              {/* <FixedCard data={weatherData} temp={temp} isLoading={isLoading}  /> */}
              <ReUsableCard data={weatherData} temp={temp} isLoading={isLoading} title2Size="2.5em" locaPsize="5em" bottomH5Size="1.5em" bottomPSize="1.2em" theme={themeMode} />
            </Container>
          } />
        </Routes>

        <Routes>
          <Route path="/addcities"  />
        </Routes>
       
    </div>
  );
}

export default App;



