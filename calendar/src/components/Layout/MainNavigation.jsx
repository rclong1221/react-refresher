import { Link } from 'react-router-dom';

import mainLogo from'../../assets/fudee-white.png';

import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
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
        <button>Logout</button>
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
          {props.isLoggedIn ? _logout : _login }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
