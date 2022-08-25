import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      { isLoggedIn ? 
        <section className={classes.profile}>
          <h1>Profile</h1>
          <ProfileForm />
        </section> :
        history.replace('/auth')
      }
    </>
    
  );
};

export default UserProfile;
