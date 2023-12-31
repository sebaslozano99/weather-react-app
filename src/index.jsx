import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>
);



// function Test(){

//   const [either, setEither] = useState(false);




//   return (
//     <div style={{width: "100%" , height: "100vh", backgroundColor: "#000", display: "grid", placeItems: "center", padding: "0", margin: "0", boxSizing: "border-box"}}>
//       <ReUsableButton width={20} fontSize='20px' onChangeState={setEither} initialState={either} >{either ? "°F" : "°C"}</ReUsableButton>


//       <p style={{color: "#fff"}}>Hello the state is now on: <em style={{color: "blue"}}>{`${either}`}</em> </p>
//     </div>
//   )
// }
