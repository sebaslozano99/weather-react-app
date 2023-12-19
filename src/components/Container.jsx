import React from 'react';
import "./Container.css";
// import FixedCard from './FixedCard';
import ReUsableCard from "./ReUsableCard";
import uuid from 'react-uuid';

const Container = ({fourCities, temp, isLoading, theme, children}) => {
  return (
    <div className='container'>
      <div className='section-one'>
        {children}
      </div>


      <div className={theme ? "section-two active" : "section-two"}>
        {
          fourCities.map(element =>
            <ReUsableCard key={uuid()} data={element} temp={temp} isLoading={isLoading} theme={theme} title2Size='1.5em' locaPsize='2em' bottomH5Size='0.9em' bottomPSize='1em' />  
          )
        }
      </div>
      
    </div>
  )
}

export default Container