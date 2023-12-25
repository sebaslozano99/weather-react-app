import React, { useState } from 'react';
import "./AddCities.css";
import uuid from 'react-uuid';

const AddCities = ({cities, onAddCity, onDeleteCity, isLoadingFourCities, themeMode, handleModifyCity, lastCity, setLastCity}) => {

    const [inputValue, setInputValue] = useState(""); //state for cities are gona be added to the list
    const [modifying, setModifying] = useState(null); //once a card holding a city is picked, the city name will be selected in this state // once this state is different than "null" the UI will display another FORM with a different "onSubmit" function

    const [newCity, setNewCity] = useState(""); //the new city is the one the user will search in the inout
    // const [lastCity, setLastCity] = useState(""); //we will store the city of the card picked up to be modified in this state
    
    

    //regular function to addNewCity to the list
    function handleSubmitForm(e){
        e.preventDefault();

        if(inputValue === "" || inputValue.length < 3) return;

        if(cities.includes(inputValue.toLocaleLowerCase())){
            alert("City already exist!");
            setInputValue("");
            return;
        }
        onAddCity(inputValue);
        setInputValue("");
    }


    
    function startModification(city){
        setModifying(city !== modifying? city : null);
        setNewCity(city);
        setLastCity(city);
    }



    function handleModifyTheSelectedCity(e){
        e.preventDefault();

        if(newCity === "" || newCity.length < 3) return;

        if(cities.includes(newCity.toLowerCase())){
            alert("City already exist!");
            setNewCity("");
            setModifying(null);
            return;
        }

        handleModifyCity(lastCity, newCity);
        setNewCity("");
        setModifying(null);
    }


    
  return (
    <div className='addcitiesbox'>

        <div className='AddCities-form'>

            {
            modifying ? 
                <form onSubmit={(e) => handleModifyTheSelectedCity(e)} >
                    <input type="text" value={newCity} onChange={(e) => setNewCity((e.target.value).toLocaleLowerCase())}  disabled={isLoadingFourCities ? true : false}  placeholder={isLoadingFourCities ? "Loading..." : "Enter New City"} />
                    <button>Modify</button>
                </form> 
            :
                <form onSubmit={(e) => handleSubmitForm(e)} >
                    <input type="text" value={inputValue} onChange={(e) => setInputValue((e.target.value).toLocaleLowerCase())}  disabled={isLoadingFourCities ? true : false} placeholder={isLoadingFourCities ? "Loading..." : "Enter New City"}  />
                    <button>Add City</button>
                </form>  
            }

        </div>

        <section className='addcities-section'>
            {
                cities.map((element, index) => 

                <div key={uuid()} className={themeMode ? "cityCard dark" : "cityCard"} style={element === modifying ? {backgroundColor: "rgba(255, 127, 80, 0.8)"} : {}}>

                    <span>{index > 9 ? "" : "0"}{index + 1}</span> 

                    <h4>{element}</h4> 

                    {index > 3 ? <button onClick={() => onDeleteCity(element)}>Remove</button> :  <button onClick={() => startModification(element)}>{element === modifying ? "Cancel" : "Modify"}</button>} 

                </div>)
            }
        </section>
    </div>
  )
}

export default AddCities