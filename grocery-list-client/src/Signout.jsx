import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const SignoutButton = styled.button`
  position: absolute;
  top: 4%;
  right: 4%;
  padding: 3%;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: bold;
`;

function Signout(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     got: false
  //   };
  // }
  
  const { user, setRedirect } = props;
  const signOut = _ => {
    axios.get('http://localhost:3005/logout')
    .then((response) => {
      // handle success
      setRedirect(false);
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  }

  return (
    <SignoutButton onClick={signOut}>Sign Out</SignoutButton>
  );
}

export default Signout;