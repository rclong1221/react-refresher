import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
      </div>
      <div className={classes.control}>
        <label htmlFor='first-name'>First</label>
        <input type='text' id='first-name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='middle-name'>Middle</label>
        <input type='text' id='middle-name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='last-name'>Last</label>
        <input type='text' id='last-name' />
      </div>
      <div className={classes.action}>
        <button>Update Profile</button>
      </div>
    </form>
  );
}

export default ProfileForm;
