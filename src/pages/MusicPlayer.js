import axios from "axios";
import React, { useEffect, useState } from "react";

const MusicPlayer = () => {

    const apiurl = "http://localhost:8000";

    const [musicFile, setMusicFile] = useState();

    const current = decodeURI(window.location.href);
    const search = current.split("?")[1];
    const params = new URLSearchParams(search);
    const keyword = params.get('musicName');


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

    const fData = new FormData();
    fData.append("musicName",keyword)


    useEffect( () => {
        axios
        .post(apiurl+"/getmusicfile",fData)
        .then(res => {})
    },[])

    return(
        <div>
            <h4>PlayerPage</h4>
            <h5>{ keyword }</h5>
        </div>
    );
};

export default MusicPlayer;