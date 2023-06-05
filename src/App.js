import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Routes>
          <Route path='/' exact element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
