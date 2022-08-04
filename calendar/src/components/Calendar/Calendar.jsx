import { Calendar, momentLocalizer } from 'react-big-calendar'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

import './Calendar.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

function MyCalendar(props) {
  return (
    <div className="myCustomHeight">
        <Calendar
            localizer={localizer}
            events={props.events}
            startAccessor="start"
            endAccessor="end"
        />
    </div>
  );
}

export default MyCalendar;