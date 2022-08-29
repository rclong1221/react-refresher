import { useRef, useState } from 'react';
import classes from '../AuthForm.module.css';
import ResendConfirmationSuccess from './ResendConfirmationSuccess';

const ResendConfirmationForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const emailInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const emailInput = emailInputRef.current.value;
        
    fetch('http://127.0.0.1:8000/rest-auth/registration/resend-email/', {
      method: 'POST',
      body: JSON.stringify({
        'email': emailInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        setEmailSent(true);
        return res.json();
      } else {
        return res.json().then((resp) => {
          console.log(resp);
        });
      }
    }).catch((err) => {
      console.log(err);
      });
    }

  return (
    <section className={classes.auth}>
    {
      emailSent ?
        <ResendConfirmationSuccess></ResendConfirmationSuccess> :
        <>
          <h1>Resend Confirmation</h1>
          <form>
            <div className={classes.control}>
              <label htmlFor='email'>Email</label>
                <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className={classes.actions}>
              <button onClick={submitHandler}>Send Email</button>
            </div>
          </form>
        </>
      }
    </section>
  );
}

export default ResendConfirmationForm;