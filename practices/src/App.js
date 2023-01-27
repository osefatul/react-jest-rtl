import './App.css';
import { useState } from 'react';


export function replaceCamelWithSpaces(colorName) {
  //MidnightBlue -> Midnight Blue
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}



function App() {
  const [disabled, setDisabled] = useState(false)
  const [btnColor, setBtnColor] = useState("MediumVioletRed")

  const newBtnColor = btnColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed"

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={{backgroundColor: disabled ?"gray" : btnColor, color:"black"}}
      onClick={() => setBtnColor(newBtnColor)}
      >
        {disabled? "Disable" : "Enable"}
      </button>


      <input 
      type="checkbox"
      id ="enable-button-checkbox"
      onChange={(e) => setDisabled(e.target.checked)}/>

      <label htmlFor='enable-button-checkbox'>
        Disable Button
      </label>
      
    </div>
  );
}

export default App;
