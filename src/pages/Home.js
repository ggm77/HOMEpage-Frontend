import React, { useState, useEffect } from "react";
import axios from 'axios';



const Home = () => {



    const [userType, setUserType] = useState();

    React.useEffect(() => {
        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(["access_token"])}`;
        console.log("home.useeffect")
        axios
        .post("http://localhost:8000/userinfo")
        .then((response) => {
            console.log(response.data);
            setUserType(response.data["userType"])
        })
        .catch((error) => {
            console.log(error);
            localStorage.clear();
            window.location.replace("/login");
        })},
        []
    
    )
    


    return(
        <div>
            <h1>Main page</h1>
            <h2>My NAS server</h2>
            <h3>{ userType }</h3>
        </div>
    );
};

export default Home;