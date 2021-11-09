import { Route, Routes } from 'react-router';

import { ShoeInventoryList, ShoeInventoryItemDetailed } from "./components";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route 
        path="/shoes"
        element={<ShoeInventoryList/>}
      />
      <Route 
        path="/shoes/:shoe_id"
        element={<ShoeInventoryItemDetailed />}
      />
      </Routes>
    
    </div>
  );
}

export default App;
