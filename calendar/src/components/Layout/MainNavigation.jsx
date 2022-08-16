import { Link } from 'react-router-dom';

import mainLogo from'../../assets/fudee-white.png';

import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  let _login = <li>
    <Link to='/auth'>
      <button>Login</button>
    </Link>
  </li>;

  let _logout = <li>
    <button>Logout</button>
  </li>;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>
          <img src={mainLogo} alt="fudee"/>
        </div>
      </Link>
      <nav>
        <ul>
          
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/calendar'>Calendar</Link>
          </li>
          {props.isLoggedIn ? _logout : _login }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
