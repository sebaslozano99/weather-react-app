import { useEffect, useState } from "react";
import Nav from "./components/Nav/Nav";
import Container from "./components/Container/Container";
import ReUsableCard from "./components/ReUsableCard";
import NoInternet from "./components/NoInternet";
import AddCities from "./components/AddCities/AddCities";
import "./App.css";
import {Routes, Route} from "react-router-dom";



function App() {
  const [weatherFourCities, setWeatherFourCities] = useState([]); //We'll fetch four random cities, from "cities" state below
  const [weatherData, setWeatherData] = useState(null); //state to store the data gotten by fetching the data
  const [searchQuery, setSearchQuery] = useState("barranquilla");
  const [cities, setCities] = useState(["new york", "jerusalem", "moscow", "tokio"]); //initial data to display four cities apart from bigger card city
  const [lastCity, setLastCity] = useState(""); //we will store the city of the card picked up to be modified in this state


  const [temp, setTemp] = useState(false); //state to display data in "Celsius" if false or in "Farenheit" if true;
  const [isLoading, setIsLoading] = useState(false); //isLoading state for bigger and independent card
  const [isLoadingFourCities, setIsLoadingFourCities] = useState(false);  //isLoading state for smaller cards
  const [themeMode, setThemeMode] = useState(false);
  const [error, setError] = useState("");
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

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


  function handleAddCity(city){
    setCities([...cities, city]);
    setWeatherFourCities([]);
  }

  function handleDeleteCity(city){
    // setCities((cities) =>([...cities.filter(element => element !== city)]));
    setCities([...cities.filter(element => element !== city)]);
    setWeatherFourCities([]);
    
  }

  //we get the name of city that is gonna be modified "lastCity",  and once the element within the array that matches "lastCity" is found, it'll be replaced with the "newCity".
  function handleModifyCity(lastCity, newCity){
      setCities([...cities.map((element, index) => cities[index] === lastCity ? newCity : element )]);
      setWeatherFourCities([]);
  }


  //use effect for the place's weather's data on the right
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchCitiesData(){
      for(let i = 0; i < cities.length; i++){ //while i < number of cities within the array, cause we'll display only 4 extra cities apart from the big card city
        try{
          setIsLoadingFourCities(true);                                                      
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=777755690ecb518be7c3410d5ae34b00` , {signal: controller.signal});
  
          const data = await res.json();

      
          if(data.cod === "404"){
            alert(`City ${cities[i]} not found!`);
            if(i > 3){
              setCities([...cities.slice(0, -1)]);
              setWeatherFourCities([]);
            }
            else{
              setCities([...cities.map(element => cities.indexOf(element) === i ? lastCity : element)]);
              setWeatherFourCities([]);
            }

            return;
          }
  
          // console.log(data); 
          setWeatherFourCities((weatherFourCities) => [...weatherFourCities, data]);
          setIsLoadingFourCities(false);
        }

        catch(error){
            // console.log(error);
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
  
  }, [cities, lastCity])




  //useEffect for weather information of the bigger card
  useEffect(() => {

    async function fetchingData(){
      if(searchQuery.length <= 3) return;
      try{
        setError("");
        setIsLoading(true);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=777755690ecb518be7c3410d5ae34b00`);
        // console.log(res);

        // if(res.status === 404) {
        //   throw new Error("Failed to fetch");
        // };

        const data = await res.json();
        // console.log(data);


        if(data.message === "city not found"){
          alert("City not found!");
          throw new Error(data.message);
        }

        setIsLoading(false);
        setWeatherData(data);
      }
      catch(error){
        // console.log(error); 
        setError(error.message);

      }
      finally{
        setIsLoading(false);
      }

    }

    fetchingData();


  }, [searchQuery])


  return (
    <div className={themeMode? "App darkMode" : "App"}>
       <Nav temp={temp} onChangeTemp={changeTemp}  onSearch={handleSearch}  theme={themeMode} onChangeTheme={changeThemeMode} displaySearchBar={displaySearchBar} setDisplaySearchBar={setDisplaySearchBar} />

        <Routes>

          <Route path="/" element={
            error === "Failed to fetch" ? 
            <NoInternet theme={themeMode} /> 
            :
            <Container fourCities={weatherFourCities} temp={temp} isLoading={isLoadingFourCities} theme={themeMode}>
              <ReUsableCard data={weatherData} temp={temp} isLoading={isLoading} title2Size="3.5em" locaPsize="4.7em" bottomH5Size="1.5em" bottomPSize="1.2em" theme={themeMode} />
            </Container>
          } ></Route>


          <Route path="/addcities" element={<AddCities  cities={cities} onAddCity={handleAddCity} onDeleteCity={handleDeleteCity} isLoadingFourCities={isLoadingFourCities} themeMode={themeMode} handleModifyCity={handleModifyCity} lastCity={lastCity} setLastCity={setLastCity} />} ></Route>

        </Routes>

        {/* <Routes>
          <Route path="/addcities" element={<AddCities  cities={cities} onAddCity={handleAddCity} onDeleteCity={handleDeleteCity} isLoadingFourCities={isLoadingFourCities} themeMode={themeMode} handleModifyCity={handleModifyCity} lastCity={lastCity} setLastCity={setLastCity} />} ></Route>
        </Routes>
        */}
    </div>
  );
}

export default App;



