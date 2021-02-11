import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import styled from '@emotion/styled';
// import a component that gives the option to register or login
// then nest the log in and register components within the parent component
import ApiContext from './ApiContext';
import GroceryImage  from './images/grocery-app-image.png';
import GoogleLogin from './LoginHooks.jsx';

const WrapperDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    input[type='text'], input[type='password'] {
      width: 250px;
      border-radius: 17px;
      height: 30px;
      border: none;
      padding: 10px;
      font-size: 16px;
      color: rgb(243, 242, 242);
    }

    img {
      height: 25px;
      width: 25px;
    }
`;

const WrapperDivParent = styled.div`
    background-image: linear-gradient(to bottom, coral , grey);
    padding-bottom: 40px;
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
    justify-content: center;
    .google-login {
      width: 100%;
      max-width: 300px;
      position: absolute;
      top: 75%;
    }
    .register-wrapper {
      position: absolute;
      bottom: 0;
      width: 100%;
      max-width: 420px;
      width: 100%;
    }
`;

const FormContentWrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 80%;
`;

const ButtonDiv =  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;  
    button {
      width: 7em;
      height: 4em;
      background-color: rgb(243, 242, 242);
      border: none;
      border-radius: 30px;
      transition: 0.5s ease-out;
      font-family: 'Big Shoulders Text', cursive;
      font-size: 16px;
      font-weight: bold;
      color: rgb(117, 117, 117);
    }
  `;  

  const ImageDiv = styled.div`
      margin: 0 auto;
      display: flex;
      justify-content: center;
      img {
        text-align: center;
        height: 60px;
        width: 60px
      }
  }`;


const ForgotDiv = styled.div`
      font-size: 14px;
    text-align: center;
    a {
      color: rgb(243, 242, 242);
      transition: 0.2s ease-in-out;
    }
  }`;

const LoginHeader = styled.div`
  h1 {
    text-align: center;
    color: white;
  }
  }`;

const LoginDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    height: 80px;
  `;

export default function(props) {
  // const [userId, setUserId] = useState('');
  const formStyle = {
    maxWidth: '350px',
    maxHeight: '525px',
    background: 'linear-gradient(#e66465, #9198e5)',
    borderRadius: '2%'
  }
  // const redirect = props.register;
  const { redirect, setRedirect, setUser, setLoadingModal } = props;
  // const [password, setPassword] = useState('');
  // const handleChangePass = (e) => {
  //   console.log('setting the userId ', e.target.value);
  //   setPassword(e.target.value);
  // } 
  // const handleChangeUsername = (e) => {
  //   console.log('setting the userId ', e.target.value);
  //   setUserId(e.target.value);
  // } 
  const api = useContext(ApiContext);
  const sendUserInfoToDatabase = (event) => {
    const username = document.querySelector('input[name=username]').value;
    const password = document.querySelector('input[name=password]').value;

    console.log('submitting a user');
    event.preventDefault();
    axios.post(api + '/login', {
      userId: username,
      password: password
    })
    .then((response) => {
      // handle successs
      setUser(username);
      setRedirect(true);
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  };

  return (
  // <div>
  //   <p>Log In</p>
  //   <form>
  //     <label>
  //     Username:
  //       <input type="text" name="Username" value={userId} onChange={handleChangeUsername} />
  //     </label>
  //     <label>
  //     Password:
  //       <input type="text" name="Password" value={password} onChange={handleChangePass} />
  //     </label>
  //     <input type="submit" value="Submit" onClick={onSubmit} />
  //   </form>
  // </div>
    // Copy and paste this into your project. Height is advised to be left as is. everything else can be manipulated to your likings.

   
    // function used to control submit event on form.

      // The prop names must be identical to whats shown below or the component would not render.
      <React.Fragment>
       {redirect ? <Redirect to="/" /> : <WrapperDivParent>
          <FormContentWrapper>
            <ImageDiv><img src={GroceryImage} alt="" /></ImageDiv>
            <LoginHeader><h1>LOG IN</h1></LoginHeader>
            <form onSubmit={sendUserInfoToDatabase}>
              <WrapperDiv><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB4ElEQVRYhb2XsWsUQRhH33eEIHIElSDYSAoVbEQlhXZWYiXiH2BnJxZWFmJraWElqSSFiIhYiCiCVoqkUBEES0EtVCIENZBc8iz2Do51b2/mbu9+5e7MvDe7w8w3QWbUBeAicBpYALaBb8BLYCkiPuaOmQpGvaKuOzib6g21NQmB6zXgcm43DV9UtzIEVM82KfAgE676OmXsSIDPAr+AnZne28C+iPhe1yhlsRwaAd4b+2hKo2HZMwI8uW+KQGcMgY0mBL6MIVD7/yFtEQL8AOYz4R1gd0T8rms09AtEBMCzTDjAq2HwJIFulkcQuDNCn+qoLfVDxib0Vd3RmEBX4kyGwIVG4X0SSwnwh92FOxGBWfV9DfyzOpczZta5HREbwL2aJs8jYm1iAt0crHk3ypmRFnVevWZR9QzKunpJ3dUk+Ii6bH0pVs6fbp/FccAH1PvmV0LlPFWP54Bb6tXMGQ/LlnrTYZuT2lYfNwgu541afahZzPzJBOG9rFj1JdRzU4D3crnH7d8HTiYvlPFzrEqg+dtMQvqhK1Pkvv3vicXd79YU/v9ddWagmnpKfWSz+8Cm+kI9b+moHliUqm3gBMXl4jCwH9gLzAFtoDyLDvAXWAN+UlTTn4B3FPXhahXnHzESzUAWXf7iAAAAAElFTkSuQmCC" alt="" /><input type="text" placeholder="Username" name="username" /></WrapperDiv>
              <WrapperDiv><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACMklEQVRYhbWXv2oUURTGf3dJsYQlrCAStgwplxC2CNFCthB9gW18BRsfQax8gDxASosIKSSQDULAQgvBQEgRSCMIQoKyxsiSJvks5g5O7t7ZOXcn+eDC/XPOd765f884EiHpMfAceAR0fPcP4BPw1jn3MZXTGnhZ0r6qsS9p+baD9yWdG4LnOJfUt3A7Q/Au8BloFbovgT3g0LdXgKdAs2DzF3jonDuyCCkL3pB0EHzde0mdiG3HjxVxIKlRR8AgINyaRugFbwU+gzoCdgpEvyS1DT5tb5tjZ9bg6ObG20jw3Qg2ZKnttPW5DywU2l+sAgLbBc+VLKAZtP8kCAhtQy6TgBDXd2E7l0AKgKQm8AToAfd89wj4Cnxwzl2m8KUIaEh6AbymfE1/SnpF9jbUg6Sl4DyfyI7QdmkWAZsJAauwmRp8VdLVLQq4krQai1V2Cl5OGZsFDc9ZDUlzkkaGrxpKWvdlaLAfSare9MqmvwqnkuYLPvO+rwoTyxCbZsuOPXbOjfOGrx8b/Ca4YwJakb4QPUmLecPXewa/Ce6YAMtN1gK2C+3tGLmFOybgm4EIYLGkPg0T3DEBh8A40l8XY/7nkOUC/GOyewcCds0PlbI03HKuW75Y7o1+klzdzAfL8N2XKqTnhcrSbMvlUoVTRdJ4q4g12aa3DCNJazMFL4joKi0XyHGi7K+qPpRttDeSLgyBL7yt5WKq/jcMhLSBAfAM6AIP/NAZcAQMgXfOud9Wzn8zHp58xlgkkQAAAABJRU5ErkJggg==" alt="" /><input type="password" placeholder="Password" name="password" /></WrapperDiv>
              <ButtonDiv><button type="submit">LOGIN</button></ButtonDiv>
              {/* <ForgotDiv>
                  <p><a href="#">Forgot Password?</a></p>
              </ForgotDiv> */}
            </form>
          </FormContentWrapper>  
          <GoogleLogin setLoadingModal={setLoadingModal} setRedirect={setRedirect} setUser={setUser} />
          <div className="register-wrapper"><RegisterButton><div><Link className="register-link" to="/register">Register</Link></div></RegisterButton></div>
        </WrapperDivParent>}
      </React.Fragment>
    );
}

const RegisterButton =  styled.div`
    display:flex;
    align-items: center;
    margin-left: auto;
    justify-content: center;
    height: 3em;
      width: 4em;
    background-color: rgb(243, 242, 242);
    .register-link {
      border: none;
      transition: 0.5s ease-out;
      text-decoration: none;
      font-family: 'Big Shoulders Text', cursive;
      font-size: 16px;
      font-weight: bold;
      color: rgb(117, 117, 117);
    }
  `; 
  