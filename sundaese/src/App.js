import { useState } from 'react';
import './App.css';


function App() {
  const [orderPhase, setOrderPhase] = useState("in progress");

  let Component = OrderEntry;
  
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
