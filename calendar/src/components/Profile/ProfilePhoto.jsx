import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import classes from './ProfilePhoto.module.css';

const ProfilePhoto = () => {
  const [profilePhoto, setProfilePhoto] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  useEffect(() => {
    if (user) {
      if (user.primary_image) {
          fetch(`http://127.0.0.1:8000/api/user_image/${user.primary_image}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          },
      })
      .then((res) => {
          if (res.ok) {
          console.log(res);
          return res.json();
          } else {
          return res.json().then((resp) => {
              let errorMessage = 'Authentication failed!';
              throw new Error(errorMessage);
          });
          }
      })
      .then((d) => {
          console.log(d);
          setProfilePhoto(`http://127.0.0.1:8000${d.image}`);
      })
      .catch((err) => {
          alert(err.message);
      });
      }
    }
  
  }, [user]);

  return (
    <>
      <img src={profilePhoto} className={classes.profile_photo} />
    </>  
  );
}

export default ProfilePhoto;