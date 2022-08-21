import { useState } from 'react';

import classes from './AuthForm.module.css';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      { 
        isLogin 
        ? <LoginForm switchAuthModeHandler={switchAuthModeHandler} /> 
        : <RegisterForm switchAuthModeHandler={switchAuthModeHandler} /> 
      }
    </section>
  );
};

export default AuthForm;
