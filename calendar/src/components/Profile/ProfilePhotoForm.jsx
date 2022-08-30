import { useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import ProfilePhoto from './ProfilePhoto';
import classes from './ProfilePhotoForm.module.css';

const ProfilePhotoForm = () => {
  const history = useHistory();
  const imageInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredImage = imageInputRef.current.files;

    // optional: Add validation
    setIsLoading(true);


    let url = 'http://127.0.0.1:8000/api/user_image/';
    let data = new FormData();

    if (enteredImage) {
      data.append('image', enteredImage[0]);
      data.append('user', `${user.uuid}`);

      fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.ok) {
          console.log("Picture has been updated!")
        } else {
          console.log("Update failed")
          return res.json().then((resp) => {
            console.log(resp);
            throw new Error(resp);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
    }
    else {
      console.log("Select an image!");
    }
  };

  return (
    <form className={classes.form} encType='multipart/form-data'>
      <div className={classes.control}>
        <label htmlFor='profile-picture'>Profile Picture</label>
        <ProfilePhoto></ProfilePhoto>
        <input type='file' id='profile-picture' ref={imageInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Set Picture</button>
      </div>
    </form>
  );
}

export default ProfilePhotoForm;
