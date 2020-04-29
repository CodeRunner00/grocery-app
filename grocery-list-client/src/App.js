import React, { useState } from 'react';
import './App.css';
import Home from './Home.jsx';
import { Button } from '@material-ui/core';
import Register from './Register.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import NewList from './NewList.jsx';
import LoadList from './LoadList.jsx';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const useStyles = makeStyles({
  root: {
    background: 'blue',
    border: 0,
    borderRadius: 5,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});


const linkStyles = makeStyles({
  root: {
    textDecoration: 'none',
    color: 'white'
  },
});

function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: [],
  //     value: '',
  //   };
  //   this.addItem = this.addItem.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  // const [items, setItems] = useState([]);
  // const [value, setValue] = useState('');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // }

  // const addItem = (event) => {
  //   setItems([...items, value]);
  //   setValue('');
  //   event.preventDefault();
  // }
  // const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState('');
  const classes = useStyles();
  const linkClasses = linkStyles();
  const [redirect, setRedirect] = useState(false);
  return (
    <Router>
    <AppWrapper>
    <p>Welcome!</p>
    {!redirect ? ( <div > <Button className={classes.root}>
      <Link to="/register" className={linkClasses.root}>Register</Link>
    </Button>
    <Button className={classes.root}>
      <Link to="/login" className={linkClasses.root}>Login</Link>
    </Button> </div> ) : null }
    


    <Switch>
          <Route path="/create">
            <NewList user={user} isLoggedIn={redirect} />
          </Route>
          <Route path="/load">
            <LoadList user={user} isLoggedIn={redirect}/>
          </Route> 
          <Route path="/register">
            <Register userId={user} setUser={setUser} setRedirect={setRedirect} redirect={redirect}/>
          </Route>
          {/* <Route path="/login">
            <LoadList user={user} />
          </Route> */}
          <Route path="/" >
            <Home userId={user} isLoggedIn={redirect} />
          </Route>
    </Switch>

    </AppWrapper>
    </Router>
  );
}

const AppWrapper = styled.div`
  position: relative;
  text-align: center;
  margin: 0 auto;
`;

export default App;