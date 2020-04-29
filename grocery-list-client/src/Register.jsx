import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function(props) {
  // const [userId, setUserId] = useState('');
  
  // const redirect = props.register;
  const { setUser, userId, redirect, setRedirect } = props;

  const handleChange = (e) => {
    console.log('setting the userId ', e.target.value);
    setUser(e.target.value);
  } 

  const onSubmit = (e) => {
    console.log('submitting a user');
    e.preventDefault();
    console.log('userId ', userId);
    axios.post('http://localhost:3005/register', {
      userId: userId
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
  redirect ? <Redirect to="/" /> :
  (<form>
    <label>
      User Id:
      <input type="text" name="userId" value={userId} onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" onClick={onSubmit} />
  </form>)
  );
}