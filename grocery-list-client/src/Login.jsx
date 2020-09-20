import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import a component that gives the option to register or login
// then nest the log in and register components within the parent component

export default function(props) {
  // const [userId, setUserId] = useState('');
  
  // const redirect = props.register;
  const { setUser, userId, redirect, setRedirect } = props;
  const [password, setPassword] = useState('');
  const handleChangePass = (e) => {
    console.log('setting the userId ', e.target.value);
    setPassword(e.target.value);
  } 
  const handleChangeUsername = (e) => {
    console.log('setting the userId ', e.target.value);
    setUser(e.target.value);
  } 

  const onSubmit = (e) => {
    console.log('submitting a user');
    e.preventDefault();
    console.log('userId ', userId);
    axios.post('http://localhost:3005/login', {
      userId: userId,
      password: password
    })
    .then((response) => {
      // handle success
      setRedirect(true);
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  };

  return (
  <div>
    <p>Log In</p>
    <form>
      <label>
      Username:
        <input type="text" name="Username" value={userId} onChange={handleChangeUsername} />
      </label>
      <label>
      Password:
        <input type="text" name="Password" value={password} onChange={handleChangePass} />
      </label>
      <input type="submit" value="Submit" onClick={onSubmit} />
    </form>
  </div>
  );
}