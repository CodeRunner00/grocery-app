import React, { useState } from 'react';
import './App.css';
import Home from './Home.jsx';
import { CircularProgress } from '@material-ui/core';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Signout from './Signout.jsx';
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
import ApiContext from './ApiContext';


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
  const [redirect, setRedirect] = useState(false);
  const prod = false;
  const api = prod ? 'http://groceryappbackend-env.eba-apn6km6g.us-east-2.elasticbeanstalk.com' : 'http://localhost:3005';
  const [loadingModal, setLoadingModal] = useState(false);


  return (
    <Router>
    <ApiContext.Provider value={api}>
    <AppWrapper>
    {/* <h1>List Loader Pro!</h1>
    {redirect ? ( <div><Link to="/create" className={linkClasses.root}><Button className={classes.root}> Create A list</Button></Link> <br></br>
      <Link to="/load" className={linkClasses.root} onClick={() => console.log('clicked on load list from homepage!')}><Button className={classes.root}>Load Lists</Button></Link>
      </div> ) : <div > <Link to="/login" className={linkClasses.root}><Button className={classes.root} onClick={(e) => console.log('clicked on login from homepage!')}> Log In </Button></Link>
      <br></br><Link to="/register" className={linkClasses.root}><Button className={classes.root} onClick={(e) => console.log('clicked on register from homepage!')}>Sign Up</Button></Link>
      </div> } */}

      {/* {redirect && <Signout user={user} setRedirect={setRedirect} /> } */}

    {loadingModal && <LoadingModal />}  
    <Switch>
      <Route path="/create">
        <NewList user={user} isLoggedIn={redirect} setRedirect={setRedirect}/>
      </Route>
      <Route path="/load">
        <LoadList user={user} isLoggedIn={redirect}/>
      </Route> 
      <Route path="/register">
        <Register user={user} setUser={setUser} setRedirect={setRedirect} redirect={redirect} setLoadingModal={setLoadingModal} />
      </Route>
      <Route path="/login">
        <Login user={user} setUser={setUser} setRedirect={setRedirect} redirect={redirect} setLoadingModal={setLoadingModal} />
      </Route>
      <Route path="/" >
        <Home user={user} isLoggedIn={redirect} setRedirect={setRedirect} />
      </Route>
    </Switch>

    </AppWrapper>
    </ApiContext.Provider>
    </Router>
  );
}

const AppWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 420px;
  width: 100%;
  border-radius: 10px;
  overflow-x:hidden;
`;

const LoadingModal =  styled.div`
  position: absolute:
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  height: 100vh;
  width: 100%;
}
`;  


export default App;