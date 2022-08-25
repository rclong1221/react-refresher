import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './PasswordForm.module.css';

const PasswordForm = () => {
  const history = useHistory();
  const password1InputRef = useRef();
  const password2InputRef = useRef();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    props.switchAuthModeHandler();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword1 = password1InputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;

    // optional: Add validation
    setIsLoading(true);

    let url = 'http://127.0.0.1:8000/rest-auth/password/change/';
    let data = {
        "new_password1": enteredPassword1,
        "new_password2": enteredPassword2,
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          alert(res);
          return res.json();
        } else {
          return res.json().then((resp) => {
            throw new Error(resp.new_password2[0]);
          });
        }
      })
      .then((d) => {
        alert("Profile updated!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password1'>New Password</label>
        <input type='password' id='new-password1' ref={password1InputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password2'>Confirm Password</label>
        <input type='password' id='new-password2' ref={password2InputRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default PasswordForm;
