import classes from './ProfilePhotoForm.module.css';

const ProfilePhotoForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='profile-picture'>Profile Picture</label>
        <input type='file' id='profile-picture' />
      </div>
      <div className={classes.action}>
        <button>Set Picture</button>
      </div>
    </form>
  );
}

export default ProfilePhotoForm;
