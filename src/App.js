import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect'
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';



function App() {

  const [serchWord, setSerchWord] = useState();

  const serch = (serchWord) => {
    //serch function
  }

  return (
    <div>
      <BrowserView>
        <BrowserRouter>
          <div>
            <p>HOME-Homepage</p>
            <Link to="/">Home</Link>
            <input type='text' name='serch' onClick={e => setSerchWord(e.target.value)}></input>
            <button onClick={ serch }>serch</button>
            <Link to="/login">Login</Link>
          </div>
          
          <Routes>
            <Route path='/' exact element={ <Home /> }></Route>
            <Route path='/login' element={ <Login /> }></Route>
          </Routes>
          
        </BrowserRouter>
       </BrowserView>


       
       <MobileView>
        <BrowserRouter>
            <div>
              <p>HOME-Homepage</p>
              <Link to="/">Home</Link>
              <input type='text' name='serch' onClick={e => setSerchWord(e.target.value)}></input>
              <button onClick={ serch }>serch</button>
              <Link to="/login">Login</Link>
            </div>
            
            <Routes>
              <Route path='/' exact element={ <Home /> }></Route>
              <Route path='/login' element={ <Login /> }></Route>
            </Routes>
            
          </BrowserRouter>
       </MobileView>
    </div>
  );
}

export default App;
