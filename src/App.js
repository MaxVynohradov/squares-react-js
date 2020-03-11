import React from 'react';
import Generator from './components/Generator'


function App() {
  return (
    <div className="App">
      <Generator initialHeight={4} initialWidth={5} cellSize={50}/>
    </div>
  );
}

export default App;
