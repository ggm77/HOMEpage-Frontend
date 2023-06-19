import axios from "axios";
import React, { useState, useEffect, useSyncExternalStore } from "react";

const Myprofile = () => {

    /* */
    const [userType, setUserType] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(["access_token"])}`;
        axios
        .post("http://localhost:8000/userinfo")
        .then((response) => {
            console.log(response.data);
            setUserType(response.data["userType"])
            setUsername(response.data["username"]);
        })
        .catch((error) => {
            //refreshToken
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
                    window.location.assign("/myprofile");
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
    /* */

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const fData = new FormData();

    fData.append("username", username);
    fData.append("currentPassword", currentPassword);
    fData.append("newPassword",newPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/changepassword",fData)
        .then(res=>{
            console.log(res);
            window.location.assign("/");
        })
        .catch(err=>{alert("Password not correct")})
    };


    return(
        <div>
            <br/>
            <div className="changePassword">
                <div>
                    <p>change { username }'s password</p>
                </div>
                <br/>
                <div>
                    <p>current password</p>
                    <input type="password" onChange={e => {setCurrentPassword(e.target.value)}}/>
                </div>
                <br/>
                <div>
                    <p>new password</p>
                    <input type="password" onChange={e => {setNewPassword(e.target.value)}}/>
                </div>
                <div>
                    <button onClick={ handleSubmit }>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Myprofile;