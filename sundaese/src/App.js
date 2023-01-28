import { useState } from 'react';
import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';


function App() {
  const [orderPhase, setOrderPhase] = useState("in progress");

  let Component = OrderEntry;

  return (
    <div className="App">
      <SummaryForm/>
    </div>
  );
}

export default App;
