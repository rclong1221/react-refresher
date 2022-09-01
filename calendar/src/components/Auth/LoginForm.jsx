import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import classes from './AuthForm.module.css';

import AuthContext from '../../store/auth-context';

const LoginForm = (props) => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const password1InputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginFailed = () => {
    toast.error('Log in failed!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const switchAuthModeHandler = () => {
    props.switchAuthModeHandler();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword1 = password1InputRef.current.value;

    // optional: Add validations

    setIsLoading(true);
    let url = 'http://127.0.0.1:8000/rest-auth/login/';;
    let data = {
        username: enteredUsername,
        password: enteredPassword1
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((resp) => {
          loginFailed();
        });
      }
    }).then((d) => {
      const numOfHours = 4;
      const expirationTime = new Date(
        new Date().getTime()
      );
      const token = d.key;

      expirationTime.setTime(expirationTime.getTime() + numOfHours * 60 * 60 * 1000);
      
      fetch('http://127.0.0.1:8000/api/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((resp) => {
            let errorMessage = 'Authentication failed!';
  
            throw new Error(errorMessage);
          });
        }
      }).then((user) => {
        authCtx.user = user;
        toast.success(`🦄 Welcome, ${user.username}!`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        authCtx.login(token, expirationTime.toISOString(), user);

        history.replace('/calendar/');
      }).catch((err) => {
        loginFailed();
      });
    }).catch((err) => {
      loginFailed();
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='username' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password1'>Password</label>
          <input type='password' id='password1' required ref={password1InputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>Login</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >Create new account</button>
        </div>
      </form>    
    </>
  );
};

export default LoginForm;
