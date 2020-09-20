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
// import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

export default function(props) {
  console.log('here are the home props ', props);
  const { userId, isLoggedIn } = props;
  return ( isLoggedIn ? 
   ( <div>
      <Switch>
        <Route path="/create">
              <NewList userId={userId}/>
            </Route>
            <Route path="/load">
              <LoadList userId={userId} />
        </Route>
      </Switch>
    </div>) : null
  );
}