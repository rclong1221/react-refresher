import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import MyCalendar from './components/Calendar/Calendar';
import Header from './components/Header';

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
  const [events, setEvents] = useState(EVENTS)

  useEffect(() => {
    console.log("SET EVENTS");
    setEvents(EVENTS);

    return () => {
      console.log("CLEANUP");
    }
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <MyCalendar events={events}></MyCalendar>
    </div>
  )
}

export default App
