import React, { useState } from 'react';
import axios from 'axios';



const Login = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const fData = new FormData();

    fData.append("username",username);
    fData.append("password", password);

    const handleSubmit = (e) => {
        e.preventDefault();
      
          axios.post("http://localhost:8000/token", fData).then((response) => {
      
            if (response.status === 200) {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.data["access_token"]}`;
              
              axios
                .post("http://localhost:8000/userinfo")
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
                
              //history.push("/");
            }
          });
        };


    return(
        <div className='login-wrapper'>
            <form>
                <h1>Login</h1>
                <label>
                    <p>Username</p>
                    <input type='text' onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button onClick={ handleSubmit }>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;