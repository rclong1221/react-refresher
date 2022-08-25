import classes from './PasswordForm.module.css';

const PasswordForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password1'>New Password</label>
        <input type='password' id='new-password1' />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password2'>New Password</label>
        <input type='password' id='new-password2' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default PasswordForm;
