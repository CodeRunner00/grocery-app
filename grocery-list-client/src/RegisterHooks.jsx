import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import logo from './images/google-logo.png';
import axios from 'axios';
import ApiContext from './ApiContext';

// refresh token
import { refreshTokenSetup } from './utils/refreshToken';

const clientId =
  '1056256709536-9btq8hmkm56ngdhrl6rl6pdkm3i4c6qa.apps.googleusercontent.com';

function RegisterHooks(props) {
  const { setLoadingModal, setRedirect, setUser } = props;
  const api = useContext(ApiContext);
  let history = useHistory();
  const onSuccess = (res) => {
    // setLoadingModal(true);
    console.log('Login Success: currentUser:', res);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    // setLoading(true);
    setUser(res.profileObj.googleId);
    axios.post(api + '/register', {userId: res.profileObj.googleId, password: res.profileObj.name+'pass'})
    .then(() =>{
      setRedirect(true);
      setLoadingModal(false);
      history.push('/');
    }).catch((err) => {
      console.log('err is ', err);
    });
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button google-register">
      <img src={logo} alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default RegisterHooks;