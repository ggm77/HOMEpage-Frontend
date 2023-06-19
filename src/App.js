import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect'
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Myprofile from './pages/Myprofile.js';
// import MusicPlayer from './pages/MusicPlayer.js';
import axios, { all } from 'axios';



const App = () => {

  const [serchWord, setSerchWord] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.assign("/login");
  }

  const serch = (serchWord) => {
    //serch function
  }

  useEffect(() => {
    if(localStorage.getItem("access_token")){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  },[]
  )
  
 

  return (
    <div>
      {/* computer */}
      <BrowserView>
        <div className='computer-header'>
          <p>HOME-Homepage</p>
          <Link to="/">Home</Link>
          {/*<Link to="/musicplayer">Music Player</Link>*/}
          <input type='text' name='serch' onClick={e => setSerchWord(e.target.value)}></input>
          <button onClick={ serch }>serch</button>
          {
            isLogin ?
            <button onClick={ logout }>Logout</button>
            :
            <Link to="/login">Login</Link>
          }
          
        </div>
        <Routes>
          <Route path='/' exact element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/myprofile' element={ <Myprofile /> }></Route>
          {/* <Route path='/musicplayer' element={ <MusicPlayer /> }></Route> */}
        </Routes>
       </BrowserView>


       {/* mobile */}
       <MobileView>
        <div className='mobile-header'>
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
       </MobileView>
    </div>
  );
}

export default App;
