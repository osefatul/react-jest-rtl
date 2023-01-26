import './App.css';
import { useState } from 'react';


export function replaceCamelWithSpaces(colorName) {
  //MidnightBlue -> Midnight Blue
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}



function App() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={disabled? {backgroundColor:"gray", color:"black"}: {backgroundColor:'red'}}
      >
        {disabled? "Disable" : "Enable"}
      </button>


      <input 
      type="checkbox"
      id ="enable-button-checkbox"
      onChange={(e) => setDisabled(e.target.checked)}/>

      <label htmlFor='enable-button-checkbox'>Disable Button</label>
      
      <input 
      type="checkbox"/>
    </div>
  );
}

export default App;
