import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const form = () => {
    if (isLogin) return <><LoginForm switchAuthModeHandler={switchAuthModeHandler} /></>
    return <><RegisterForm switchAuthModeHandler={switchAuthModeHandler} /></> 
  }

  return (
    <section className={classes.auth}>
      { isLoggedIn ? history.replace('/calendar/') : form() }
    </section>
  );
};

export default AuthForm;
