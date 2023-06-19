import React, { useState, useEffect } from "react";
import axios from 'axios';



const Home = () => {

    const goToMyprofile = () => {
        window.location.assign("/myprofile");
    }

    const goToMusicPlayer = () => {
        window.location.assign("/musicplayer")
    }



    const [userType, setUserType] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(["access_token"])}`;
        console.log("home.useeffect")
        axios
        .post("http://localhost:8000/userinfo")
        .then((response) => {
            console.log(response.data);
            setUserType(response.data["userType"])
            setUsername(response.data["username"]);
        })
        .catch((error) => {
            //리프레시 토큰 제출
            const rData = new FormData();
            rData.append("refresh_token", localStorage.getItem("refresh_token"))
            console.log(rData);
            axios
            .post("http://localhost:8000/refreshToken",rData)
            .then(response=>{
                if (response.status === 200) {
                    axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${response.data["access_token"]}`;

                    
                    localStorage.setItem("access_token", response.data["access_token"])
                    localStorage.setItem("token_type", response.data["token_type"])
                    localStorage.setItem("refresh_token", response.data["refresh_token"])
                    window.location.assign("/");
            }
            })
            .catch(error => {
            if(error.request.status===401){
                console.log(error);
                localStorage.clear();
                window.location.assign("/login");
            }else{
                alert("System Error\nhome-1");
            }
            });
        })},[]
    
    );


    


    return(
        <div>
            <h1>Main page</h1>
            <h2>My NAS server</h2>
            <h3>{ userType }</h3>
            <h4>{ username }</h4>
            <button onClick={ goToMyprofile }>myprofile</button>
            <button onClick={ goToMusicPlayer }>MusicPlayer</button>
        </div>
    );
};

export default Home;