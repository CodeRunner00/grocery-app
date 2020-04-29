import React, { useState } from 'react';
import LoadList from './LoadList.jsx';
import NewList from './NewList.jsx';
import { Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: 'black',
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

export default function(props) {
  console.log('here are the home props ', props);
  const classes = useStyles();
  const linkClasses = linkStyles();
  const { userId, isLoggedIn } = props;
  return ( isLoggedIn ? 
   ( <div>
      <h1>Welcome to the app!</h1>
      <Button className={classes.root}>
      <Link to="/create" className={linkClasses.root}>Create A list</Link>
      </Button>
      <Button className={classes.root}>
      <Link to="/load" className={linkClasses.root}>Load Lists</Link>
      </Button>
      <Switch>
        <Route path="/create">
              <NewList userId={userId}/>
            </Route>
            <Route path="/load">
              <LoadList userId={userId} />
        </Route>
      </Switch>
    </div>) : <Redirect to="/register" />
  );
}