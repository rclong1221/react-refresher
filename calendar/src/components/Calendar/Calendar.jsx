import { Calendar, momentLocalizer } from 'react-big-calendar'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import classes from './Calendar.module.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

function MyCalendar(props) {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      { 
        isLoggedIn ? <div className={classes.myCustomHeight}>
          <Calendar
            localizer={localizer}
            events={props.events}
            startAccessor="start"
            endAccessor="end"
          /> 
        </div> : 
        history.replace('/auth')
      }  
    </>
  );
}

export default MyCalendar;