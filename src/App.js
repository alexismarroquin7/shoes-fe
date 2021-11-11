import { Route, Routes } from 'react-router';

import {
  ShoeInventoryList,
  ShoeInventoryItemDetailed,
  Login,
  Register,
  ConfirmEmail
} from "./components";

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
      <Route 
        path="/login"
        element={<Login />}
      />
      <Route 
        path="/register"
        element={<Register />}
      />
      <Route 
        path="/confirm-email/:token"
        element={<ConfirmEmail />}
      />
      </Routes>
    
    </div>
  );
}

export default App;
