import React, { useState } from "react";
import {axiosWithAuth as axios, setToken} from "../utils/api";

const Login = ({history}) => {
   // make a post request to retrieve a token from the api
   // when you have handled the token, navigate to the BubblePage route
   const [user, setUser] = useState({
      username: "",
      password: ""
   });

   const handleChange = event => {
      setUser({
         ...user,
         [event.target.name]: event.target.value
      });
   };

   const handleSubmit = event => {
      event.preventDefault();

      axios()
         .post("/api/login", user)
         .then(response => {
            setToken(response.data.payload);
            history.push("/");
         })
         .catch(err => {
            console.error(err.response);
         })
   };

   return (
      <div className="">
         <h1>Welcome to the Bubble App!</h1>
         <form onSubmit={handleSubmit}>
            <legend>Enter Username and Password</legend>
            <label>
               Username:
            <input name="username" type="text" placeholder="Username" value={user.username} onChange={handleChange} />
            </label>
            <label>
               Password:
            <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />
            </label>

            <div className="button-row">
               <button type="submit">Login</button>
            </div>
         </form>
      </div>
   );
};

export default Login;
