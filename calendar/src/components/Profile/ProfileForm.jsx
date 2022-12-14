import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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

  const updateFailed = () => {
    toast.error('Update failed!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    if (user) {
      if (user.uuid) {
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
            console.log(resp);
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
        console.log(err.message);
      });
      }
    }
    
  }, [user])

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredMiddleName = middleNameInputRef.current.value;

    // optional: Add validation
    setIsLoading(true);


    let url = `http://127.0.0.1:8000/api/users/${user.uuid}/`;
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
          return res.json();
        } else {
          return res.json().then((resp) => {
            updateFailed();
          });
        }
      })
      .then((d) => {
        toast.success('???? Profile updated!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        updateFailed();
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
