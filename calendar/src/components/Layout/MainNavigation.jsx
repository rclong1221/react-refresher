import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import mainLogo from'../../assets/fudee-white.png';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
    history.replace('/');
  };

  let _login = <ul>
    <li>
      <Link to='/auth'>
        <button>Login</button>
      </Link>
    </li>
  </ul>;

  let _logout = <ul>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/calendar'>Calendar</Link>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>
          <img src={mainLogo} alt="fudee"/>
        </div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? _logout : _login }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
