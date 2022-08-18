import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'http://127.0.0.1:8000/rest-auth/login/';
    } else {
      url =
        'http://127.0.0.1:8000/rest-auth/registration/';
    }
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const numOfHours = 4;
        const expirationTime = new Date(
          new Date().getTime()
        );

        expirationTime.setTime(expirationTime.getTime() + numOfHours * 60 * 60 * 1000);
        
        console.log(expirationTime.toISOString());
        authCtx.login(data.key, expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='username' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
