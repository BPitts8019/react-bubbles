import React, {useState} from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className="">
      <h1>Welcome to the Bubble App!</h1>
      <form>
         <legend>Enter Username and Password</legend>
         <label>
            Username:
            <input name="username" type="text" placeholder="Username" />
         </label>
         <label>
            Password:
            <input name="password" type="text" placeholder="Password" />
         </label>

         <div className="button-row">
            <button type="submit">Login</button>
         </div>
      </form>
    </div>
  );
};

export default Login;
