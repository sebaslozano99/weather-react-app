import React, { useState } from 'react';
import "./Nav.css";
import ReUsableButton from "./ReUsableButton";
import { Link } from 'react-router-dom';

const Nav = ({onSearch, temp, onChangeTemp, theme, onChangeTheme}) => {

  const [userSearch, setUserSearch] = useState("");
  const [burgerState, setBurgerState] = useState(false);

  function handleInputSearch(e,userSearch){
    e.preventDefault();
    onSearch(userSearch);
    setUserSearch("");
  }


  function handleSetBurgerState(){
    setBurgerState(!burgerState);
  }

  return (
    <header className='header'>
        
      <div className='logo-container'>
        <img src="../../images/weather.png" alt="logo" />
        <h1>Weather App</h1>
      </div>


      <form className='input-container' onSubmit={(e) => handleInputSearch(e, userSearch)}>
        <input type="text" placeholder='search city' value={userSearch} onChange={(e) => setUserSearch(e.target.value.toLocaleLowerCase())}/>
        <button>Search</button>
      </form>


      <div className={burgerState ? "burger active" : "burger"}  onClick={handleSetBurgerState}>
        <span className="bar" style={theme ? {backgroundColor: "#fff"} : {}}></span>
        <span className="bar" style={theme ? {backgroundColor: "#fff"} : {}}></span>
        <span className="bar" style={theme ? {backgroundColor: "#fff"} : {}}></span>
      </div>



      <nav className={burgerState ? "navBar navActive" : "navBar"}  style={theme ? {backgroundColor: "rgba(0, 0, 0, 0.9)"} : {}}>

        <ul>
            <li><Link to="/" style={theme ? {color: "#fff"}: {}} onClick={handleSetBurgerState}>Home</Link></li>
            <li><Link to="#" style={theme ? {color: "#fff"}: {}} onClick={handleSetBurgerState}>About</Link></li>
            <li><Link to="#" style={theme ? {color: "#fff"}: {}} onClick={handleSetBurgerState}>Add Cities</Link></li>
        </ul>



        <ReUsableButton width={5} initialState={temp} onChangeState={onChangeTemp} btnColor='#000'  fontSize='12px' className='changeTheme' >{temp ? "°F" : "°C"}</ReUsableButton>


        <ReUsableButton width={5} initialState={theme} onChangeState={onChangeTheme} btnColor='#000'  fontSize='12px' className='changeTheme' >{theme ? "D" : "L"}</ReUsableButton>


      </nav>

    </header>
  )
}

export default Nav