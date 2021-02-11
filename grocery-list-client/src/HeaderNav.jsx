import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import Signout from './Signout.jsx';

function HeaderNav(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     got: false
  //   };
  // }


  let location = useLocation();
  
  const { setItemView, itemView, setRedirect, user, triggerUpdatedLists } = props;
  const showBack = (location.pathname === '/create' || itemView);

  const setItemViewToggle = () => {
    if(location.pathname === '/') {
      setItemView(false);
      triggerUpdatedLists();
    } 
  }


  return (
   <StyledWrapper>
    {showBack && <div><Link to='/'><StyledButton onClick={setItemViewToggle}>Go Home</StyledButton></Link></div>}
    <Link to='/create'>
      <StyledButton variant="contained" color="primary" className="create-list">Create a List</StyledButton>
    </Link>
    <Signout user={user} setRedirect={setRedirect} />
  </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  display: flex;
  height: 15vh;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
    width: 6em;
    height: 4em;
    background-color: rgb(243,242,242);
    border: none;
    border-radius: 30px;
    -webkit-transition: 0.5s ease-out;
    transition: 0.5s ease-out;
    font-size: 18px;
    font-weight: bold;
    color: black;
    a {
      text-decoration: none;
    }
    &.create-list {
      width: 9em;
    }
    `;

export default HeaderNav;


