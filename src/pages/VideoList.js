import axios from "axios";
import React, { useState, useEffect } from "react";

const VideoList = () => {

    const apiurl = "http://localhost:8000";

    const [videolist, setVideolist] = useState([]);
    const [videolistLen, setVideolistLen] = useState();

    const refresh = () => {
        window.location.replace("/videolist")
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
                    window.location.assign("/videolist");
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
        .post(apiurl + "/getvideolist")
        .then(res=>{
            // console.log(res);
            setVideolist(res.data.data);
            setVideolistLen(res.data.len);
        })
        .catch(err=>{ console.log(err) })
    },[])


    return(
        <div>
        <div className="player">
            <p>Video Player</p>
        </div>
        <div className="refresh">
            <button onClick={ refresh }>Refresh</button>
        </div>
        <div className="playlist">
            <h3>Play List</h3>
            <h4>Number of video : { videolistLen }</h4>
            <div className="filelist">
                {videolist.map((it) => {
                    return(
                        <div key={ it.id }>
                            {/* <p>{ it.data }</p> */}
                            <form method="GET" action="/videoplayer">
                                <button type="submit" name="videoName" value={ it.data }>{ it.data }</button>
                            </form>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    );
};

export default VideoList;