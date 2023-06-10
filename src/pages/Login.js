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
          console.log("login.handlesubmit")
          axios.post("http://localhost:8000/token", fData).then((response) => {
      
            if (response.status === 200) {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.data["access_token"]}`;

              
              localStorage.setItem("access_token", response.data["access_token"])
              localStorage.setItem("token_type", response.data["token_type"])
              window.location.replace("/");
            }
          })
        };


    return(
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        width: '100%', height: '100vh'
        }}>
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
                <br/>
                <br/>
                <div>
                    <button onClick={ handleSubmit }>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;