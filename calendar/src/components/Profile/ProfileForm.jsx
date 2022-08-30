import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const nameInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const middleNameInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    props.switchAuthModeHandler();
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users/${user.uuid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((resp) => {
            let errorMessage = 'authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((d) => {
        usernameInputRef.current.value = d.username;
        nameInputRef.current.value = d.name;
        firstNameInputRef.current.value = d.first_name;
        lastNameInputRef.current.value = d.last_name;
        middleNameInputRef.current.value = d.middle_name;
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [])

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredMiddleName = middleNameInputRef.current.value;

    // optional: Add validation
    setIsLoading(true);


    let url = 'http://127.0.0.1:8000/api/users/803981b7-a755-4719-9321-9190d8878ed5/';
    let data = {
        "username": enteredUsername,
        "name": enteredName,
        "first_name": enteredFirstName,
        "last_name": enteredLastName,
        "middle_name": enteredMiddleName
    }

    fetch(url, {
      method: 'PATCH',
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
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
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
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' ref={usernameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='first-name'>First</label>
        <input type='text' id='first-name' ref={firstNameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='middle-name'>Middle</label>
        <input type='text' id='middle-name' ref={middleNameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='last-name'>Last</label>
        <input type='text' id='last-name' ref={lastNameInputRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Update Profile</button>
      </div>
    </form>
  );
}

export default ProfileForm;
