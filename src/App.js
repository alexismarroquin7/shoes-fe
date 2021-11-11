import { Route, Routes, useNavigate } from 'react-router';

import { ShoeInventoryList, ShoeInventoryItemDetailed } from "./components";

import './App.css';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/shoes');
  }, [navigate])

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
