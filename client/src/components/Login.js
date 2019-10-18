import React, { useRef } from 'react';
import axios from 'axios';

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  // make a post request to retrieve a token from the api
  const submit = () => {
  axios.post('http://localhost:5000/api/login', {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then(res => {
        // SUCCESS! Credentials are valid:
        //   1- Put the token string in local storage under a 'token' key
        console.log(res.data);
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble');
      })
      .catch(error => {
        // Alert error
        alert(error.response.data.message);
      });
    }

  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='login-page'>
      <h1>Welcome to the Bubble App!</h1>
      <div className='login-inputs'>
        username <input ref={usernameRef} type="text" />
        <br />
        password <input ref={passwordRef} type="text" />
      </div>

      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;