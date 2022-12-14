import { useContext, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import MyCalendar from './components/Calendar/Calendar';
import Layout from './components/Layout/Layout';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import AuthForm from './components/Auth/AuthForm';
import AuthContext from './store/auth-context';
import UserProfile from './components/Profile/UserProfile';
import EmailConfirm from './components/Auth/EmailConfirm';
import EmailConfirmation from './components/Auth/EmailConfirmation';
import ResendConfirmationForm from './components/Auth/ResendConfirmation/ResendConfirmationForm';

const EVENTS = [
  {
    'title': 'Spa Day',
    'allDay': true,
    'start': new Date(2022, 7, 0),
    'end': new Date(2022, 7, 1)
  },
  {
    'title': 'Work',
    'start': new Date(2022, 7, 7),
    'end': new Date(2022, 7, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2022, 7, 13, 0, 0, 0),
    'end': new Date(2022, 7, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2022, 10, 6, 0, 0, 0),
    'end': new Date(2022, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2022, 7, 9, 0, 0, 0),
    'end': new Date(2022, 7, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2022, 7, 11),
    'end': new Date(2022, 7, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 7, 12, 10, 30, 0, 0),
    'end': new Date(2022, 7, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2022, 7, 12, 12, 0, 0, 0),
    'end': new Date(2022, 7, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2022, 7, 12, 14, 0, 0, 0),
    'end': new Date(2022, 7, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start': new Date(2022, 7, 12, 17, 0, 0, 0),
    'end': new Date(2022, 7, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start': new Date(2022, 7, 12, 20, 0, 0, 0),
    'end': new Date(2022, 7, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start': new Date(2022, 7, 13, 7, 0, 0),
    'end': new Date(2022, 7, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 2',
    'start': new Date(2022, 7, 13, 7, 0, 0),
    'end': new Date(2022, 7, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 3',
    'start': new Date(2022, 7, 13, 7, 0, 0),
    'end': new Date(2022, 7, 13, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'start': new Date(2022, 7, 17, 19, 30, 0),
    'end': new Date(2022, 7, 17, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'start': new Date(2022, 7, 20, 19, 30, 0),
    'end': new Date(2022, 7, 22, 2, 0, 0)
  }
]

function App() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  console.log(token)

  const [events, setEvents] = useState(EVENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/api/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((resp) => {
            let errorMessage = 'Authentication failed!';
  
            throw new Error(errorMessage);
          });
        }
      }).then((user) => {
        authCtx.setUser(user);
        setIsLoaded(true);
      }).catch((err) => {
        alert(err.message);
      });
    }

    return () => {
      console.log("CLEANUP");
    }
  }, [token]);
  

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <StartingPageContent />
        </Route>
        <Route path='/calendar'>
          <MyCalendar events={events}></MyCalendar>
        </Route>
        <Route path='/auth'>
          <AuthForm></AuthForm>
        </Route>
        <Route path='/profile'>
          <UserProfile></UserProfile>
        </Route>
        <Route path='/confirm-email'>
          <EmailConfirm></EmailConfirm>
        </Route>
        <Route path='/email-confirmation'>
          <EmailConfirmation></EmailConfirmation>
        </Route>
        <Route path='/resend-confirmation'>
          <ResendConfirmationForm></ResendConfirmationForm>
        </Route>
      </Switch>
      <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </Layout>
  )
}

export default App
