import { Navigate, Route, Routes } from 'react-router';

import {
  ShoeInventoryList,
  AdminShoeInventoryList,
  ShoeInventoryItemDetailed,
  Login,
  Register,
  ConfirmEmail,
  Home,
  AdminPanel,
  NewShoeForm
} from "./components";

import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const { user, status } = useSelector(s => s.auth);
  
  return (
    <div className="App">
      <Routes>
      <Route 
        path="/"
        element={<Home/>}
      />
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
      <Route
        path="/admin"
        element={
          status.loggedIn && user.role.name === 'admin' 
          ? <AdminPanel /> 
          : <Navigate to="/login"/> 
        }
      />
      <Route
        path="/admin/shoe_inventory"
        element={
          status.loggedIn && user.role.name === 'admin' 
          ? <AdminShoeInventoryList /> 
          : <Navigate to="/login"/> 
        }
      />
      <Route
        path="/admin/shoe_inventory"
        element={
          status.loggedIn && user.role.name === 'admin' 
          ? <AdminShoeInventoryList /> 
          : <Navigate to="/login"/> 
        }
      />
      <Route
        path="/admin/shoe_inventory/create-new-shoe"
        element={
          status.loggedIn && user.role.name === 'admin' 
          ? <NewShoeForm /> 
          : <Navigate to="/login"/> 
        }
      />
      </Routes>
    
    </div>
  );
}

export default App;
