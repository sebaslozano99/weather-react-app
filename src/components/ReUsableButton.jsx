import React, { useState } from 'react';





//PROPS INFORMATION 

//initialState -- state for the button to change once clicked
//onChageState -- we pass in from Father comp a set Function, to update the state from father component


const ReUsableButton = ({initialState = false, onChangeState, width = 10, backColor = "purple", btnColor = "#252525", textColor = "#fff", fontSize = `${width / 10}em`, className = "",  children}) => {

    const [buttonState, setButtonState] = useState(initialState);


    function handleButtonState(){
      setButtonState(!buttonState);
      onChangeState(!initialState);
    }

    const buttonStyle = {
        backgroundColor: backColor,
        outline: "none",
        borderStyle: "none",
        padding: "5px",
        cursor: "pointer",
        color: textColor,
        width: `${width}em`,
        height: `${width / 2}em`,
        borderRadius: `${width}em`,
        position: "relative",
      }
      
      
      const leftStyle = {
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "40%",
        height: "80%",
        backgroundColor: btnColor,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontSize: fontSize,
        transition: "all ease-in-out .5s",

      }

      const rightStyle = {
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "40%",
        height: "80%",
        backgroundColor: btnColor,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontSize: fontSize,
        transition: "all ease-in-out .5s",
      }


      // function changeStateButton(){
      //   setButtonState(!buttonState);
      //   onChangeState(buttonState);
      // }

  return (

    <button style={buttonStyle} onClick={handleButtonState} className={className}>
        <div style={buttonState ? rightStyle : leftStyle}>{children}</div>
    </button>
  )
}

export default ReUsableButton