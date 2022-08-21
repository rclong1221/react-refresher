import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

import AuthContext from '../../store/auth-context';

const RegisterForm = (props) => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const password1InputRef = useRef();
  const password2InputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    props.switchAuthModeHandler();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword1 = password1InputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;

    // optional: Add validation

    setIsLoading(true);


    let url = 'http://127.0.0.1:8000/rest-auth/registration/';
    let data = {
        username: enteredUsername,
        email: enteredEmail,
        password1: enteredPassword1,
        password2: enteredPassword2
    }
    

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((resp) => {
            let errorMessage = 'Authentication failed!';
            // if (resp && resp.error && resp.error.message) {
            //   errorMessage = resp.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((d) => {
        const numOfHours = 4;
        const expirationTime = new Date(
          new Date().getTime()
        );

        expirationTime.setTime(expirationTime.getTime() + numOfHours * 60 * 60 * 1000);
        
        console.log(expirationTime.toISOString());
        authCtx.login(d.key, expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='username' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password1'>Your Password</label>
          <input type='password1' id='password1' required ref={password1InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password2'>Your Password</label>
          <input type='password2' id='password2' required ref={password2InputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>Create Account</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >Login with existing account</button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
