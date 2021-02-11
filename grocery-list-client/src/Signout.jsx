import React, { useContext } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import ApiContext from './ApiContext';
const SignoutButton = styled.button`
    width: 7em;
    height: 4em;
    background-color: rgb(243,242,242);
    border: none;
    border-radius: 30px;
    -webkit-transition: 0.5s ease-out;
    transition: 0.5s ease-out;
    font-size: 16px;
    font-weight: bold;
    color: black;
    a {
      text-decoration: none;
    }
`;

function Signout(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     got: false
  //   };
  // }
  
  const { setRedirect } = props;
  const api = useContext(ApiContext);
  const signOut = _ => {
    axios.get(api + '/logout')
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