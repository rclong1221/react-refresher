import { useEffect } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';
import ProfilePhotoForm from './ProfilePhotoForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn) history.replace('/auth');
  }, [isLoggedIn])

  return (
    <>
      { isLoggedIn ? 
        <section className={classes.profile}>
          <ProfilePhotoForm />
          <ProfileForm />
          <PasswordForm />
        </section> :
        history.replace('/auth')
      }
    </>
    
  );
};

export default UserProfile;
