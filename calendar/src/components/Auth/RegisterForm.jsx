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
            console.log(resp);
            throw new Error(resp);
          });
        }
      })
      .then((d) => {
        history.replace('/confirm-email/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='username' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password1'>Password</label>
          <input type='password' id='password1' required ref={password1InputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='password' id='password2' required ref={password2InputRef} />
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
