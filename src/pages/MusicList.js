import axios from "axios";
import React, { useState, useEffect } from "react";




const MusicList = () => {

    const apiurl = "http://localhost:8000";


    const [musiclist, setMusiclist] = useState([]);
    const [musiclistLen, setMusiclistLen] = useState();

    const refresh = () => {
        window.location.replace("/musiclist")
    }


    /* */
    const [userType, setUserType] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(["access_token"])}`;
        axios
        .post(apiurl + "/userinfo")
        .then((response) => {
            // console.log(response.data);
            setUserType(response.data["userType"])
            setUsername(response.data["username"]);
        })
        .catch((error) => {
            //refreshToken
            const rData = new FormData();
            rData.append("refresh_token", localStorage.getItem("refresh_token"))
            // console.log(rData);
            axios
            .post(apiurl + "/refreshToken",rData)
            .then(response=>{
                if (response.status === 200) {
                    axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${response.data["access_token"]}`;

                    
                    localStorage.setItem("access_token", response.data["access_token"])
                    localStorage.setItem("token_type", response.data["token_type"])
                    localStorage.setItem("refresh_token", response.data["refresh_token"])
                    window.location.assign("/musiclist");
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
        });
    
    },[]
    
    );
    /* */


    useEffect(() => {
        axios
        .post(apiurl + "/getmusiclist")
        .then(res=>{
            // console.log(res);
            setMusiclist(res.data.data);
            setMusiclistLen(res.data.len);
        })
        .catch(err=>{ console.log(err) })
    },[])


    return(
        <div>
            <div className="player">
                <p>Music Player</p>
            </div>
            <div className="refresh">
                <button onClick={ refresh }>Refresh</button>
            </div>
            <div className="playlist">
                <h3>Play List</h3>
                <h4>Number of music : { musiclistLen }</h4>
                <div className="filelist">
                    {musiclist.map((it) => {
                        return(
                            <div key={ it.id }>
                                {/* <p>{ it.data }</p> */}
                                <form method="GET" action="/musicplayer">
                                    <button type="submit" name="musicName" value={ it.data }>{ it.data }</button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

};

export default MusicList;