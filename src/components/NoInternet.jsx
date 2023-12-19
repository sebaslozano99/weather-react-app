import React from 'react';
// import { BoxIconElement } from 'boxicons';



const divStyle = {
    width: "100%",
    height: "92vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}

const ImgStyle = {
  width: "70%",
  height: "70%",
  opacity: "50%",
}

const NoInternet = ({theme}) => {
  const pStyle = {
    color: theme ? "#ffffff" : "#000000",
    textShadow: theme ? "0 0 5px #000000" : "0 0 3px #ffffff",
    fontSize: "2em",
    fontWeight: "bold",
  }
  return (
    <div style={divStyle}>
      {
        theme ? 
        <>
          <img src='../../images/noInternetWhite.svg' alt="noInternetWhite" style={ImgStyle} />
          <p style={pStyle}>❌Something went wrong! You're not connected!❌</p>
        </>
        : 
        <>
          <img src='../../images/noInternetBlack.svg' alt='noWifiBlack' style={ImgStyle} />
          <p style={pStyle}>❌Something went wrong! You're not connected!❌</p>
        </>

      }
    </div>
  )
}

export default NoInternet