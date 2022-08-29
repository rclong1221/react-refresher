import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "../../store/auth-context";

const EmailConfirmation = () => {
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  useEffect(() => {
    let parts = window.location.href.split('/');
    let lastSegment = parts.pop() || parts.pop();
    let _key = {
      key: lastSegment
    };
    console.log(_key);
    fetch('http://127.0.0.1:8000/rest-auth/registration/verify-email/', {
        method: 'POST',
        body: JSON.stringify(_key),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.ok) {
          console.log("OKAY!")
          console.log(res.status);
          setEmailConfirmed(true);
          return res.json();
        } else {
          console.log("NOT OKAY!")
          console.log(res.status);
          return res.json().then((resp) => {
            console.log(resp);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    
  }, []);

  return (
    <>
      <h2>{ emailConfirmed ? "Email has been successfully confirmed.  Please log in." : "Confirmation link has expired.  Please use the new link that will be sent to your email." }</h2>
    </>
  );
}

export default EmailConfirmation;