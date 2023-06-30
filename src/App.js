import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect'
import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Myprofile from './pages/Myprofile.js';
import MusicList from './pages/MusicList.js';
import MusicPlayer from './pages/MusicPlayer.js';
import VideoList from './pages/VideoList.js';
import VideoPlayer from './pages/VideoPlayer.js';
import axios, { all } from 'axios';




const App = () => {

  const [serchWord, setSerchWord] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const gotoLoginpage = () => {
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
          <Link to="/">Home-Homepage</Link>
          {/*<Link to="/musicplayer">Music Player</Link>*/}
          <input type='text' name='serch' onClick={e => setSerchWord(e.target.value)}></input>
          <button onClick={ serch }>serch</button>
          {
            isLogin ?
            <button onClick={ gotoLoginpage }>Logout</button>
            :
            <button onClick={ gotoLoginpage }>Login</button>
          }
          
        </div>
        <Routes>
          <Route path='/' exact element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/myprofile' element={ <Myprofile /> }></Route>
          <Route path='/musiclist' element={ <MusicList /> }></Route>
          <Route path='/musicplayer' element={ <MusicPlayer /> }></Route>
          <Route path='/videolist' element={ <VideoList /> }></Route>
          <Route path='/videoplayer' element={ <VideoPlayer /> }></Route>
        </Routes>
       </BrowserView>


       {/* mobile */}
       <MobileView>
       <div className='computer-header'>
          <Link to="/">Home-Homepage</Link>
          {/*<Link to="/musicplayer">Music Player</Link>*/}
          <input type='text' name='serch' onClick={e => setSerchWord(e.target.value)}></input>
          <button onClick={ serch }>serch</button>
          {
            isLogin ?
            <button onClick={ gotoLoginpage }>Logout</button>
            :
            <button onClick={ gotoLoginpage }>Login</button>
          }
          
        </div>
        <Routes>
          <Route path='/' exact element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/myprofile' element={ <Myprofile /> }></Route>
          <Route path='/musiclist' element={ <MusicList /> }></Route>
          <Route path='/musicplayer' element={ <MusicPlayer /> }></Route>
          <Route path='/videolist' element={ <VideoList /> }></Route>
          <Route path='/videoplayer' element={ <VideoPlayer /> }></Route>
        </Routes>
       </MobileView>
    </div>
  );
}

export default App;
