import { useState } from 'react';
import './App.css';
import Inputs from './components/inputs/Inputs';
import Schedules from './components/schedules/Schedules';

function App() {
  const [data, setData] = useState({
    groups: 0,
    actualGroup: 1,
    startTime: '00:00',
    duration: 20,
  });

  return (
    <div className="App">
      <Inputs setData={setData} />
      <Schedules data={data} />
    </div>
  );
}

export default App;
